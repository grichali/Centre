// auth.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogInDTO } from './dto/login.dto';
import { CreatEtudiantDto } from 'src/etudiant/dto/create-etudiant.dto';
import { CreatProfDto } from 'src/prof/dto/create-prof.dto';
import { CreatCentreDto } from 'src/Centre/dto/create-centre.dto';
import { CreateAdminDto } from 'src/admin/dto/create-admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup-prof')
  async signUpProf(
    @Body(ValidationPipe) createProfDto: CreatProfDto,
  ): Promise<any> {
    return await this.authService.signUpProf(createProfDto);
  }

  @Post('signup-etudiant')
  async signUpEtudiant(
    @Body(ValidationPipe) createEtudiantDto: CreatEtudiantDto,
  ): Promise<any> {
    return await this.authService.signUpEtudiant(createEtudiantDto);
  }

  @Post('signup-centre')
  async signUpCentre(@Body(ValidationPipe) createCentretDto: CreatCentreDto) {
    return await this.authService.signUpCentre(createCentretDto);
  }

  @Post('signup-admin')
  async signUpAdmin(@Body(ValidationPipe) createAdmintDto: CreateAdminDto) {
    return await this.authService.signUpAdmin(createAdmintDto);
  }

  @Post('login-prof')
  async loginProf(@Body(ValidationPipe) loginDto: LogInDTO) {
    return this.authService.loginProf(loginDto);
  }

  @Post('login-etudiant')
  async loginEtudiant(@Body(ValidationPipe) loginDto: LogInDTO) {
    return this.authService.loginEtudiant(loginDto);
  }

  @Post('login-centre')
  async loginCentre(@Body(ValidationPipe) loginDto: LogInDTO) {
    return this.authService.loginCentre(loginDto);
  }

  @Post('login-admin')
  async loginAdmin(@Body(ValidationPipe) loginDto: LogInDTO) {
    return this.authService.loginAdmin(loginDto);
  }
}
