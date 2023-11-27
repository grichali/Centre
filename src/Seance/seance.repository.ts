import { EntityRepository, Repository } from "typeorm";
import { Seance } from "./seance.entity";



@EntityRepository(Seance)
export class SeanceRepository extends Repository<Seance>{

}