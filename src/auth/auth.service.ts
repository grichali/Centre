import { Injectable } from '@nestjs/common';
import { CreatCentreDto } from 'src/Centre/dto/create-centre.dto';
import { CentreService } from 'src/centre/centre.service';
import { CreatEtudiantDto } from 'src/etudiant/dto/create-etudiant.dto';
import { EtudiantService } from 'src/etudiant/etudiant.service';
import { CreatProfDto } from 'src/prof/dto/create-prof.dto';
import { ProfService } from 'src/prof/prof.service';
import { LogInDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';
import { AdminService } from 'src/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly profService: ProfService,
    private readonly etudiantService: EtudiantService,
    private readonly centreService: CentreService,
    private readonly adminService: AdminService,
  ) {}

  async signUpProf(createProfDto: CreatProfDto) {
    return await this.profService.signUp(createProfDto);
  }

  async signUpEtudiant(createEtudiantDto: CreatEtudiantDto) {
    return this.etudiantService.signUP(createEtudiantDto);
  }

  async signUpCentre(createCentretDto: CreatCentreDto) {
    return await this.centreService.signUp(createCentretDto);
  }
  async signUpAdmin(createAdmintDto: CreateAdminDto) {
    return await this.adminService.signUp(createAdmintDto);
  }

  async loginProf(logInDto: LogInDTO) {
    return await this.profService.logIn(logInDto);
  }

  async loginEtudiant(logInDto: LogInDTO) {
    return await this.etudiantService.logIn(logInDto);
  }

  async loginCentre(logInDto: LogInDTO) {
    return await this.centreService.logIn(logInDto);
  }

  async loginAdmin(logInDto: LogInDTO) {
    return await this.adminService.logIn(logInDto);
  }
}
