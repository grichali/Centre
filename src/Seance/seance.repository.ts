import { LessThan, Repository } from 'typeorm';
import { Seance } from './seance.entity';
import { BadRequestException, Injectable, Optional } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProfRepository } from 'src/Prof/prof.repository';
import { CreateSeanceDto } from './dto/createseance.dto';
import { SalleRepository } from 'src/salle/salle.repository';
import { ModifySeanceDto } from './dto/modifyseance.dto';
import { FormationRepository } from 'src/formation/formation.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Prof } from 'src/Prof/prof.entity';
import { Salle } from 'src/Salle/salle.entity';
import { Formation } from 'src/Formation/formation.entity';

@Injectable()
export class SeanceRepository extends Repository<Seance> {
  constructor(
    dataSource: DataSource,
    @Optional()
    @InjectRepository(Prof)
    private readonly profRepository: ProfRepository,
    @Optional()
    @InjectRepository(Salle)
    private readonly salleRepository: SalleRepository,
    @Optional()
    @InjectRepository(Formation)
    private readonly formationRepository: FormationRepository,
  ) {
    super(Seance, dataSource.createEntityManager());
  }

  async createSeance(
    createSeanceDto: CreateSeanceDto,
    ProfId: number,
    SalleId: number,
  ): Promise<Seance> {
    const {
      titre, 
      date,
      time,
      duration,
      description,
      prixSeance,
      placeDisponible,
    } = createSeanceDto;

    const id = ProfId;
    const id_s = SalleId;
    const prof = await this.profRepository.findOne({ where: { id } });
    if (!prof) {
      throw new BadRequestException('Prof not found');
    }
    const salle = await this.salleRepository.findOne({ where: { id: id_s } });
    if (!salle) {
      throw new BadRequestException('Salle not found');
    }
    const isSalleAvailable = await this.isSalleAvailable(
      SalleId,
      date,
      time,
      duration,
    );
    if (!isSalleAvailable) {
      throw new BadRequestException(
        'Salle is not available at the specified date and time.',
      );
    }

    const seance = new Seance();
    seance.titre = titre;
    seance.date = date;
    seance.time = time;
    seance.duration = duration;
    seance.description = description;
    seance.prixSeance = prixSeance;
    seance.placeDisponible = placeDisponible;
    seance.prof = prof;
    seance.salle = salle;

    try {
      await this.save(seance);
      return seance;
    } catch (error) {
      console.log('Error creating Seance:', error);
      throw new BadRequestException('Failed to create Seance');
    }
  }

  async isSalleAvailable(
    salleId: number,
    date: string,
    time: string,
    duration: number,
  ): Promise<boolean> {
    // Calculate the end time based on the provided time and duration
    const endTime = new Date(`${date}T${time}`);
    endTime.setHours(endTime.getHours() + duration);

    // Check if there is any existing seance for the salle during the specified time range
    const existingSeance = await this.findOne({
      where: {
        salle: { id: salleId },
        date: date,
        time: LessThan(endTime.toISOString()), // Check if the existing seance ends before the new one starts
      },
    });

    // If there is an existing seance during the specified time range, salle is not available
    return !existingSeance;
  }

  async modifySeance(
    seanceId: number,
    modifySeanceDto: ModifySeanceDto,
  ): Promise<Seance> {
    const seance = await this.findOneOrFail({
      where: { id: seanceId },
      relations: ['prof', 'formation', 'salle'],
    });

    if (modifySeanceDto.titre !== undefined) {
      seance.titre = modifySeanceDto.titre;
    }
    if (modifySeanceDto.date !== undefined) {
      seance.date = modifySeanceDto.date;
    }
    if (modifySeanceDto.duration !== undefined) {
      seance.duration = modifySeanceDto.duration;
    }
    if (modifySeanceDto.description !== undefined) {
      seance.description = modifySeanceDto.description;
    }
    if (modifySeanceDto.prixSeance !== undefined) {
      seance.prixSeance = modifySeanceDto.prixSeance;
    }
    if (modifySeanceDto.placeDisponible !== undefined) {
      seance.placeDisponible = modifySeanceDto.placeDisponible;
    }
    if (modifySeanceDto.time !== undefined) {
      seance.time = modifySeanceDto.time;
    }

    try {
      await this.save(seance);
      return seance;
    } catch (error) {
      console.error('Error modifying Seance:', error);
      throw new BadRequestException('Failed to modify Seance');
    }
  }

  async deleteSeance(seanceId: number) {
    const seance = await this.findOne({ where: { id: seanceId } });

    if (!seance) {
      throw new BadRequestException('Seance not found !');
    }

    try {
      await this.remove(seance);
    } catch (error) {
      console.error('Error deleting Seance:', error);
      throw new BadRequestException('Failed to delete Seance');
    }
  }

  async integreFormation(
    seanceId: number, 
    formationId: number,
  ): Promise<Seance> {
    const seance = await this.findOne({
      where: { id: seanceId },
      relations: ['prof', 'formation', 'salle'],
    });
    const formation = await this.formationRepository.findOne({
      where: { id: formationId },
      relations: ['prof', 'seance'],
    });

    if (!seance) {
      throw new BadRequestException('Seance not found');
    }

    if (!formation) {
      throw new BadRequestException('Formation not found');
    }

    try {
      seance.formation = formation;
      await this.save(seance);
      return seance;
    } catch (error) {
      console.error('Error integrating Formation:', error);
      throw new BadRequestException('Failed to integrate Formation');
    }
  }
}
