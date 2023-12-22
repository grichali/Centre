import { DataSource, Repository } from 'typeorm';
import { Etudiant } from './etudiant.entity';
import { CreatEtudiantDto } from './dto/create-etudiant.dto';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LogInDTO } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EtudiantRepository extends Repository<Etudiant> {
  constructor(private dataSource: DataSource) {
    super(Etudiant, dataSource.createEntityManager());
  }

  async signUp(createEtudiantDto: CreatEtudiantDto) {
    const { nom, prenom, tel, niveau, email, password } = createEtudiantDto;
    const etudiant = new Etudiant();
    etudiant.nom = nom;
    etudiant.prenom = prenom;
    etudiant.tel = tel;
    etudiant.niveau = niveau;
    etudiant.email = email;
    etudiant.salt = await bcrypt.genSalt();
    etudiant.password = await bcrypt.hash(password, etudiant.salt);
    return await this.save(etudiant);
  }

  async logIn(loginDto: LogInDTO) {
    const { email, password } = loginDto;
    try {
      const etudiant = await this.findOne({
        where: { email },
      });

      if (!etudiant) {
        throw new UnauthorizedException(
          'Etudiant with this email does not exist',
        );
      }

      const isPasswordValid = await etudiant.validatePassword(password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return etudiant;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException(error.message); // Propagate the specific error message
      }

      console.error('Error during login:', error.message);
      throw new Error('Login failed');
    }
  }
  async DeleteEtudiant(etudiantId: number) {
    const etudiant = await this.findOne({
      where: { id: etudiantId },
    });

    if (!etudiant) {
      throw new BadRequestException('Etudiant not found !');
    }
    try {
      await this.remove(etudiant);
    } catch (error) {
      console.error('Error deleting Etudiant:', error);
      throw new BadRequestException('Failed to delete Etudiant');
    }
  }
}
