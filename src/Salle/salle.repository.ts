import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Salle } from "./salle.entity";
import { CreateSalleDto } from "./dto/createsalle.dto";
import { CentreRepository } from "src/centre/centre.repository";
import { ModifySalleDto } from "./dto/modifysalle.dto";



@Injectable()
export class SalleRepository extends Repository<Salle>{

    constructor(
        dataSource : DataSource,
        private readonly centreRepository : CentreRepository){
        super(Salle,dataSource.createEntityManager())
    }

    async createSalle(createSalleDto: CreateSalleDto, centreId: number): Promise<Salle> {
        const { nombrePlace, prixHeure, tempDispo } = createSalleDto;
    
        const id = centreId;
        const centre = await this.centreRepository.findOne({
            where : {id}
        });
        if (!centre){
          throw new BadRequestException('Centre not found');
        }
    
        const tempDispoJson = JSON.stringify(tempDispo);
        console.log(tempDispoJson);
        const salle = new Salle(); 
        salle.nombrePlace = nombrePlace;
        salle.prixHeure = prixHeure;
        salle.tempDispo = tempDispoJson;
        salle.centre = centre; 


        try {
          await this.save(salle);    
          return salle;
        } catch (error) {
          console.error('Error creating Salle:', error);
          throw new BadRequestException('Failed to create Salle');
        }


      }


      async modifySalle(salleId: number, modifySalleDto: ModifySalleDto): Promise<Salle> {
        const salle = await this.findOne({
            where: { id: salleId },
            relations: ['centre', 'seances'],
        });
    
        if (!salle) {
            throw new BadRequestException('Salle not found');
        }
    
        if (modifySalleDto.nombrePlace !== undefined) {
            salle.nombrePlace = modifySalleDto.nombrePlace;
        }
    
        if (modifySalleDto.prixHeure !== undefined) {
            salle.prixHeure = modifySalleDto.prixHeure;
        }
    
        if (modifySalleDto.tempDispo !== undefined) {
            // Convert tempDispo JSON string to an array
            const existingTempDispo = JSON.parse(salle.tempDispo);
    
            // Iterate through the modified days
            for (const modifiedDay of modifySalleDto.tempDispo) {
                // Check if the day already exists in the existing tempDispo
                const existingDayIndex = existingTempDispo.findIndex((day) => day.day === modifiedDay.day);
    
                if (existingDayIndex !== -1) {
                    // If the day exists, update its time slots
                    existingTempDispo[existingDayIndex].timeSlots = modifiedDay.timeSlots;
                } else {
                    // If the day doesn't exist, add it to existingTempDispo
                    existingTempDispo.push(modifiedDay);
                }
            }
    
            // Update salle.tempDispo and save to the database
            salle.tempDispo = JSON.stringify(existingTempDispo);
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
    

    async deleteSalle(salleId : number ){
        const salle = await this.findOne({
            where:{id : salleId}
        });

        if(!salle){
            throw new BadRequestException("salle not found !")
        }
        try{
            await this.remove(salle);
        }
        catch(error){
            console.error('Error deleting Salle:', error);
            throw new BadRequestException('Failed to delete Salle');
        }


    }

}