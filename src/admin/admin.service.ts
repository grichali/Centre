/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminRepository } from './admin.repository';
import { LogInDTO } from 'src/auth/dto/login.dto';

@Injectable()
export class AdminService {
  constructor(private readonly adminRepository: AdminRepository) {}

  async signUp(createAdminDto: CreateAdminDto) {
    return await this.adminRepository.signUp(createAdminDto);
  }

  async logIn(logInDto: LogInDTO) {
    return await this.adminRepository.logIn(logInDto);
  }

  async DeleteEtudiantByAdmin(token: string, adminId: number, etudiantId: number) {
    const decodedToken = await this.adminRepository.validateToken(token);

    if (!decodedToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    return await this.adminRepository.DeleteEtudiantByAdmin(adminId, etudiantId);
  }
  async  DeleteCentreByAdmin(adminId : number,centreId : number){

    return await this.adminRepository.DeleteCentreByAdmin(adminId,centreId);
  }
  async DeleteProfByAdmin(adminId : number,profId : number){

    return await this.adminRepository.DeleteProfByAdmin(adminId,profId);
  }


  /*getAll() {
    return `This action returns all admin`;
  }

  getOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }*/
}
