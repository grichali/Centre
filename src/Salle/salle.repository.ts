/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Salle } from './salle.entity';
import { CreateSalleDto } from './dto/createsalle.dto';
import { CentreRepository } from 'src/centre/centre.repository';
import { ModifySalleDto } from './dto/modifysalle.dto';
//test     hhhhhhh
@Injectable()
export class SalleRepository extends Repository<Salle> {
  constructor(
    dataSource: DataSource,
    private readonly centreRepository: CentreRepository,
  ) {
    super(Salle, dataSource.createEntityManager());
  }

  async createSalle(
    createSalleDto: CreateSalleDto,
    centreId: number,
  ): Promise<Salle> {
    const { nombrePlace, prixHeure,description} = createSalleDto;

    const id = centreId;
    const centre = await this.centreRepository.findOne({
      where: { id },
    });
    if (!centre) {
      throw new BadRequestException('Centre not found');
    }

    const salle = new Salle();
    salle.nombrePlace = nombrePlace;
    salle.prixHeure = prixHeure;
    salle.centre = centre;
    salle.description = description;

    try {
      await this.save(salle);
      return salle;
    } catch (error) {
      console.error('Error creating Salle:', error);
      throw new BadRequestException('Failed to create Salle');
    }
  }

  async modifySalle(
    salleId: number,
    centreId: number,
    modifySalleDto: ModifySalleDto,
  ): Promise<Salle> {
    const centre = await this.centreRepository.findOne({  where: { id:centreId }, });
    if (!centre) {
      throw new BadRequestException('Centre not found');
    }

    const salle = await this.findOneOrFail({
      where: { id: salleId },
      relations: ['centre', 'seances'],
    });
    if (salle.centre.id !== centreId) {
      throw new BadRequestException('Salle does not belong to the specified Centre');
    }
    if (modifySalleDto.nombrePlace !== undefined) {
      salle.nombrePlace = modifySalleDto.nombrePlace;
    }

    if (modifySalleDto.prixHeure !== undefined) {
      salle.prixHeure = modifySalleDto.prixHeure;
    }
    if (modifySalleDto.description !== undefined) {
      salle.description = modifySalleDto.description;
    }

    try {
      await this.save(salle);
      return salle;
    } catch (error) {
      console.error('Error modifying Salle:', error);
      throw new BadRequestException('Failed to modify Salle');
    }
  }

  async deleteSalle(salleId: number, centreId: number) {
    const id = centreId;
    const centre = await this.centreRepository.findOne({where: { id }, });
    if (!centre) {
      throw new BadRequestException('Centre not found');
    }


    const salle = await this.findOne({
      where: { id: salleId },
    });

    if (!salle) {
      throw new BadRequestException('Salle not found');
    }
    if (salle.centre.id !== centreId) {
      throw new BadRequestException('Salle does not belong to the specified Centre');
    }

    try {
      await this.remove(salle);
    } catch (error) {
      console.error('Error deleting Salle:', error);
      throw new BadRequestException('Failed to delete Salle');
    }
  }

  async getCentreSalles(centreId: number) {
    try {
      const centre = await this.centreRepository.findOne({
        where: { id: centreId },
        relations: ['salles'],
      });

      if (!centre) {
        throw new Error(`Centre with ID ${centreId} not found`);
      }

      return centre.salles;
    } catch (error) {
      console.error('Error getting centre salles:', error);
      throw new Error('Failed to get centre salles');
    }
  }




  async getAvailableTimeSlots(salleId: number, date: any): Promise<string[]> {
    const dateString = typeof date === 'string' ? date : date.date;
    const salle = await this.findOne({
      where: { id: salleId },
      relations: ['seances'],
    });

    if (!salle) {
      throw new BadRequestException('Salle not found');
    }

    const startTime = 8;
    const endTime = 22;

    const allTimeSlots: string[] = [];

    for (let i = startTime; i < endTime; i++) {
      const formattedStartTime = `${i.toString().padStart(2, '0')}:00`;
      const formattedEndTime = `${(i + 1).toString().padStart(2, '0')}:00`;
      allTimeSlots.push(`${formattedStartTime} - ${formattedEndTime}`);
    }

    const seancesOnDate = salle.seances.filter(
      (seance) => seance.date === dateString,
    );

    const occupiedTimeSlots: Set<string> = new Set();

    seancesOnDate.forEach((seance) => {
      const seanceTimeStart = new Date(`${dateString}T${seance.time}`).getHours();
      const seanceTimeEnd = seanceTimeStart + seance.duration;

      for (let i = seanceTimeStart; i < seanceTimeEnd; i++) {
        const formattedStartTime = `${i.toString().padStart(2, '0')}:00`;
        const formattedEndTime = `${(i + 1).toString().padStart(2, '0')}:00`;
        occupiedTimeSlots.add(`${formattedStartTime} - ${formattedEndTime}`);
      }
    });

    const availableTimeSlots = allTimeSlots.filter((timeSlot) => !occupiedTimeSlots.has(timeSlot));

    return availableTimeSlots;
  }



}
