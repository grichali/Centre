import { Repository } from 'typeorm';
import { Seance } from './seance.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ProfRepository } from 'src/Prof/prof.repository';
import { CreateSeanceDto } from './dto/createseance.dto';
import { SalleRepository } from 'src/salle/salle.repository';
import { ModifySeanceDto } from './dto/modifyseance.dto';
import { FormationRepository } from 'src/formation/formation.repository';

@Injectable()
export class SeanceRepository extends Repository<Seance> {
  constructor(
    dataSource: DataSource,
    private readonly profRepository: ProfRepository,
    private readonly salleRepository: SalleRepository,
    private readonly formationRepository?: FormationRepository, // Paramètre optionnel
  ) {
    super(Seance, dataSource.createEntityManager());
  }

  async createSeance(
    createSeanceDto: CreateSeanceDto,
    ProfId: number,
    SalleId: number,
  ): Promise<Seance> {
    const { titre, date, duration, description, prixSeance, placeDisponible } =
      createSeanceDto;

    const id = ProfId;
    const id_s = SalleId;
    const prof = await this.profRepository.findOne({ where: { id: id } });
    if (!prof) {
      throw new BadRequestException('Prof not found');
    }
    const salle = await this.salleRepository.findOne({ where: { id: id_s } });
    if (!salle) {
      throw new BadRequestException('Salle not found');
    }

    const seance = new Seance();
    seance.titre = titre;
    seance.date = date;
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
    }
  }
  async modifySeance(
    seanceId: number,
    modifySeanceDto: ModifySeanceDto,
  ): Promise<Seance> {
    const seance = await this.findOne({
      where: { id: seanceId },
      relations: ['prof', 'formation', 'salle'],
    });
    if (!seance) {
      throw new BadRequestException('Seance not found');
    }
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
      seance.formation = formation; // Assigne la formation à la séance
      await this.save(seance); // Sauvegarde la séance mise à jour avec la nouvelle formation
      return seance; // Retourne la séance modifiée
    } catch (error) {
      console.error('Error integrating Formation:', error);
      throw new BadRequestException('Failed to integrate Formation');
    }
  }
}
