// auth.controller.ts
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { CreatEtudiantDto } from 'src/etudiant/dto/create-etudiant.dto';
import { CreatProfDto } from 'src/prof/dto/create-prof.dto';
 
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
 
  @Post('signup-prof')
  async signUpProf(
    @Body(ValidationPipe) createProfDto : CreatProfDto
  ): Promise<any> {
    return this.authService.signUpProf(createProfDto);
  }

  @Post('signup-etudiant')
  async signUpEtudiant(
    @Body(ValidationPipe) createEtudiantDto : CreatEtudiantDto
  ): Promise<any> {
    return this.authService.signUpEtudiant(createEtudiantDto);
  }
 
  // @Post('login-prof')
  // async loginProf(
  //   @Body(ValidationPipe)  loginDto : LoginDTO
  //   ){ 
  //     const {email , password } = loginDto ;
  //   return this.authService.loginProf(email,password);
  // }


  // @Post('login-etudiant')
  // async loginEtudiant(
  //   @Body(ValidationPipe)  loginDto : LoginDTO
  // ){
  //   const {email , password } = loginDto ;
  //   return this.authService.loginEtudiant(email,password);
  // }

  
}
