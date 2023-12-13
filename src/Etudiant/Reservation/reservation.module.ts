import { Module } from "@nestjs/common";
import { EtudiantFormation } from "./reservation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReservationService } from "./reservation.service";
import { ReservationRepository } from "./reservation.repository";
import { ReservationController } from "./reservation.controller";
import { Etudiant } from "../etudiant.entity";
import { Formation } from "src/Formation/formation.entity";
import { EtudiantRepository } from "../etudiant.repository";
import { FormationRepository } from "src/formation/formation.repository";
import { ProfRepository } from "src/prof/prof.repository";
import { Prof } from "src/Prof/prof.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([EtudiantFormation, FormationRepository]),
  ],
  providers: [ReservationService, ReservationRepository, EtudiantRepository],
  controllers: [ReservationController],
})
export class ReservationModule {}