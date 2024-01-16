import { BadRequestException, Injectable } from "@nestjs/common";
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

  async deleteReservation(resId : number){
    try{
      await this.delete(resId);
      return "reservation has been deleted succesfully";
    }catch(error){
      throw new BadRequestException('Failed to delete reservation');

    }
  }



  async getEtudiantReservations(etudiantId: number): Promise<FormationReserv[]> {
    try {
      const etudiant1 = await this.etudiantRepository.findOne({
        where: { id: etudiantId },
      });      
      const reservations = await this.find({
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