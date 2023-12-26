import { BadRequestException, Injectable } from '@nestjs/common';
import { EtudiantFormation } from './reservation.entity';
import { DataSource, Repository } from 'typeorm';
import { EtudiantRepository } from '../etudiant.repository';
import { FormationRepository } from 'src/formation/formation.repository';

@Injectable()
export class ReservationRepository extends Repository<EtudiantFormation> {
  constructor(
    private dataSource: DataSource,
    private readonly etudiantRepository: EtudiantRepository,
    private readonly formationRepository: FormationRepository,
  ) {
    super(EtudiantFormation, dataSource.createEntityManager());
  }

  async createReservation(etudiantId: number, formationId: number) {
    const formation = await this.formationRepository.findOneOrFail({
      where: { id: formationId },
    });
    const etudiant = await this.etudiantRepository.findOneOrFail({
      where: { id: etudiantId },
    });

    try {
      const reservation = new EtudiantFormation();
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
    //   const reservation = await this.find({
    //     where : {id : resId}
    //   })

      await this.delete(resId);
      return "reservation has been deleted succesfully";
    }catch(error){
      throw new BadRequestException('Failed to delete reservation');

    }
  }


  async getEtudiantReservations(etudiantd : number){ 
    const etudiant = await this.etudiantRepository.findOneOrFail({
      where: { id: etudiantd },
    });
    return await this.find({
      where: { etudiant: { id: etudiantd } },
    })
  }
}
