import { BadRequestException, Injectable, Optional } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { SeanceReserv } from "./seance_reserv.entity";
import { FormationRepository } from "src/formation/formation.repository";
import { EtudiantRepository } from "src/etudiant/etudiant.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Seance } from "src/Seance/seance.entity";
import { SeanceRepository } from "src/seance/seance.repository";

@Injectable()

export class SeanceResevRepository extends Repository<SeanceReserv>{
    constructor(
        dataSource: DataSource,
        @Optional()
        @InjectRepository(Seance)
        private readonly seanceRepository : SeanceRepository,
        @Optional()
        @InjectRepository(EtudiantRepository)
        private readonly etudiantRepository : EtudiantRepository,
      ) {
        super(SeanceReserv, dataSource.createEntityManager());
      }


      
  async createReservation(etudiantId: number, seanceId: number) {
    const seance = await this.seanceRepository.findOneOrFail({
      where: { id: seanceId },
    });
    const etudiant = await this.etudiantRepository.findOneOrFail({
      where: { id: etudiantId },
    });

    try {
      const reservation = new SeanceReserv();
      reservation.seance = seance;
      reservation.etudiant = etudiant;

      return await this.save(reservation);
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw new BadRequestException('Failed to create reservation');
    }
  }

  async deleteReservation(resId : number){
    try{
      await this.delete(resId);
      return "reservation has been deleted succesfully";
    }catch(error){
      throw new BadRequestException('Failed to delete reservation');
    }
  }



  async getEtudiantReservations(etudiantId: number): Promise<SeanceReserv[]> {
    try {
      const reservations = await this.find({
        where: { etudiant: { id: etudiantId } },
        relations: ['etudiant', 'seance'], 
      });
      console.log(reservations);
      return reservations;
    } catch (error) {
      console.error('Error getting reservations:', error);
      throw new Error('Failed to get reservations');
    }
  }

}