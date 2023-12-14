import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Salle } from './salle.entity';
import { CreateSalleDto } from './dto/createsalle.dto';
import { CentreRepository } from 'src/centre/centre.repository';
import { ModifySalleDto } from './dto/modifysalle.dto';

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
    const { nombrePlace, prixHeure} = createSalleDto;

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
    modifySalleDto: ModifySalleDto,
  ): Promise<Salle> {
    const salle = await this.findOneOrFail({
      where: { id: salleId },
      relations: ['centre', 'seances'],
    });

    if (modifySalleDto.nombrePlace !== undefined) {
      salle.nombrePlace = modifySalleDto.nombrePlace;
    }

    if (modifySalleDto.prixHeure !== undefined) {
      salle.prixHeure = modifySalleDto.prixHeure;
    }

    try {
      // Save the modified salle to the database
      await this.save(salle);
      return salle;
    } catch (error) {
      console.error('Error modifying Salle:', error);
      throw new BadRequestException('Failed to modify Salle');
    }
  }

  async deleteSalle(salleId: number) {
    const salle = await this.findOne({
      where: { id: salleId },
    });

    if (!salle) {
      throw new BadRequestException('salle not found !');
    }
    try {
      await this.remove(salle);
    } catch (error) {
      console.error('Error deleting Salle:', error);
      throw new BadRequestException('Failed to delete Salle');
    }
  }

  async getCentreSalles(centreId : number){

    const centre = await this.centreRepository.findOne({
      where : {id : centreId}
    })
    //probb
    return "hhh"
  }
}
