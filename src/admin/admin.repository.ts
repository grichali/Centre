/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
   /* async GiveAdminRole(adminId: number , moderatorid:number){
        const admin = await this.findOne({ where: { id: adminId } });

    if (!admin || admin.role !== 'admin') {
      throw new NotFoundException('Admin not found or unauthorized');
    }
    }*/


  async DeleteEtudiantByAdmin(adminId: number, etudiantId: number) {
    const admin = await this.findOne({ where: { id: adminId } });

    if (!admin || admin.role !== 'admin') {
      throw new NotFoundException('Admin not found or unauthorized');
    }

    const EtudiantRepository = await this.dataSource.getRepository('Etudiant');
    const etudiant = await EtudiantRepository.findOne({where : {id : etudiantId}});
    if (!etudiant) {
      throw new NotFoundException('Etudiant not found!');
    }

    const ReservationRepository = await this.dataSource.getRepository('reservation');
    const ReviewRepository = await this.dataSource.getRepository('review');

    try {
      const reservation = await ReservationRepository.find({ where : { etudiant: etudiant }});

      for(const reserv of reservation){
        await ReservationRepository.remove(reserv);
      }

      const review = await ReviewRepository.find({ where : {etudiant : etudiant }});
      for(const rev of review){
        await ReviewRepository.remove(rev);

      }

      await EtudiantRepository.remove(etudiant);

    } catch (error) {
      console.error('Error deleting etudiant by admin:', error);
      throw new BadRequestException('Failed to delete etudiant by admin');
    }
  }


  async DeleteCentreByAdmin(adminId: number, centreId: number) {
    const admin = await this.findOne({ where: { id: adminId } });

    if (!admin || admin.role !== 'admin') {
      throw new NotFoundException('Admin not found or unauthorized');
    }

    const centreRepository = this.dataSource.getRepository('Centre');
    const centre = await centreRepository.findOne({ where: { id: centreId } });

    if (!centre) {
      throw new NotFoundException('Centre not found');
    }

    const salleRepository = this.dataSource.getRepository('Salle');
    const salles = await salleRepository.find({ where: { centre: centre } });
    const seanceRepository = this.dataSource.getRepository('Seance');

    try {
      for (const salle of salles) {
        const seances = await seanceRepository.find({ where: { salle: salle } });
        for (const seance of seances) {
          await seanceRepository.remove(seance);
        }

        await salleRepository.remove(salle);
      }

      await centreRepository.remove(centre);
    } catch (error) {
      console.error('Error deleting centre by admin:', error);
      throw new BadRequestException('Failed to delete centre by admin');
    }
  }


  async DeleteProfByAdmin(adminId: number, profId: number) {
    const admin = await this.findOne({ where: { id: adminId } });

    if (!admin || admin.role !== 'admin') {
      throw new NotFoundException('Admin not found or unauthorized');
    }

    const profRepository = this.dataSource.getRepository('Prof');
    const prof = await profRepository.findOne({ where: { id: profId } });

    if (!prof) {
      throw new NotFoundException('Prof not found');
    }

    const seanceRepository = this.dataSource.getRepository('Seance');
    const formationRepository = this.dataSource.getRepository('Formation');
    const reviewRepository = this.dataSource.getRepository('Review');
    const reservationRepository = this.dataSource.getRepository('reservation');

    try {

      const profSeances = await seanceRepository.find({ where: { prof: prof } });
      for (const seance of profSeances) {
        await seanceRepository.remove(seance);
      }

      const profFormations = await formationRepository.find({ where: { prof: prof } });
      for (const formation of profFormations) {
          const reviews = await reviewRepository.find({ where: { formation: formation } });
          const reservations = await reservationRepository.find({ where: { formation: formation } });

          for (const review of reviews) {
            await reviewRepository.remove(review);
          }

          for (const reservation of reservations) {
            await reservationRepository.remove(reservation);
          }
          await formationRepository.remove(formation);
        }

        await profRepository.remove(prof);
      }catch (error) {
      console.error('Error deleting prof by admin:', error);
      throw new BadRequestException('Failed to delete prof by admin');
    }
  }
  

}
