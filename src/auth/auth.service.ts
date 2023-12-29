/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    private readonly jwtService: JwtService,
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
    const user = await this.profService.logIn(logInDto);
    const token = await this.generateToken({ sub: user.id, role: 'prof' });
    return { user, token };
  }

  async loginEtudiant(logInDto: LogInDTO) {
    const user = await this.etudiantService.logIn(logInDto);
    const token = await this.generateToken({ sub: user.id, role: 'etudiant' });
    return { user, token };
  }

  async loginCentre(logInDto: LogInDTO) {
    const user = await this.centreService.logIn(logInDto);
    const token = await this.generateToken({ sub: user.id, role: 'centre' });
    return { user, token };
  }


  async loginAdmin(logInDto: LogInDTO) {
    const user = await this.adminService.logIn(logInDto);
    const token = await this.generateToken({ sub: user.id, role: 'admin' });
    return { user, token };
  }

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
