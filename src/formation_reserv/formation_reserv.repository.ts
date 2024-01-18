/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { FormationReserv } from "./formation_reserv.entity";
import { DataSource, Repository } from "typeorm";
import { EtudiantRepository } from "src/etudiant/etudiant.repository";
import { FormationRepository } from "src/formation/formation.repository";
import { Formation } from "src/Formation/formation.entity";
import { InjectRepository } from "@nestjs/typeorm";




@Injectable()

export class FormationReservRepository extends Repository<FormationReserv>{


  constructor(
    private dataSource: DataSource,
    private readonly etudiantRepository: EtudiantRepository,
    private readonly formationRepository: FormationRepository,
  ) {
    super(FormationReserv, dataSource.createEntityManager());
  }



  async createReservation(etudiantId: number, formationId: number) {
    const FormationRepository = await this.dataSource.getRepository(Formation);
    const formation = await FormationRepository.findOneOrFail({
      where: { id: formationId },
    });
    const etudiant = await this.etudiantRepository.findOneOrFail({
      where: { id: etudiantId },
    });

    try {
      const reservation = new FormationReserv();
      reservation.formation = formation;
      reservation.etudiant = etudiant;

      return await this.save(reservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw new BadRequestException('Failed to create reservation');
    }
  }

  async deleteReservation(etudiantId: number, resId: number): Promise<string> {
    try {
      const etudiant = await this.etudiantRepository.findOne({
        where: { id: etudiantId },
      });

      if (!etudiant) {
        throw new NotFoundException('Etudiant not found');
      }
      const reservationToDelete = etudiant.reservations.find(
        (reservation) => reservation.id === resId
      );

      if (!reservationToDelete) {
        throw new NotFoundException('Reservation not found for the given Etudiant');
      }
      await this.delete(resId);

      return 'Reservation has been deleted successfully';
    } catch (error) {
      throw new BadRequestException('Failed to delete reservation', error);
    }
  }



  async getEtudiantReservations(etudiantId: number): Promise<FormationReserv[]> {
    try {
      const etudiant1 = await this.etudiantRepository.findOne({
        where: { id: etudiantId },
      });
      });
      const reservations = await this.find({
        where: { etudiant: { id: etudiantId } },
        relations: ['etudiant', 'formation'],
      });
        where: { etudiant: { id: etudiant1.id } },
        relations : ['formation','formation.prof' ,'formation.seance']
      });;
      console.log(reservations);
      return reservations;
    } catch (error) {
      console.error('Error getting reservations:', error);
      throw new Error('Failed to get reservations');
    }
  }
}