import { DataSource, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Injectable } from '@nestjs/common';
import { LogInDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminRepository extends Repository<Admin> {
  constructor(private dataSource: DataSource) {
    super(Admin, dataSource.createEntityManager());
  }

  async signUp(createAdminDto: CreateAdminDto) {
    const { nom, prenom, tel, email, password, acces_level, role, permission } =
      createAdminDto;
    const admin = new Admin();
    admin.nom = nom;
    admin.prenom = prenom;
    admin.tel = tel;
    admin.email = email;
    admin.acces_level = acces_level;
    admin.role = role;
    admin.permission = permission;
    admin.salt = await bcrypt.genSalt();
    admin.password = await bcrypt.hash(password, admin.salt);
    return await this.save(admin);
  }
  async logIn(loginDto: LogInDTO) {
    const { email, password } = loginDto;
    try {
      const admin = await this.findOne({
        where: { email },
      });
      if (admin && admin.validatePassword(password)) {
        return admin;
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }

  // async GiveRole (){}
}
