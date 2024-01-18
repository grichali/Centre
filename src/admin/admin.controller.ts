/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete,Req, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)

export class AdminController {
  constructor(private readonly adminService: AdminService) {}

 /* @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }*/
  @Roles('admin')
  @Delete('delete_etudiant/:etudiantId')
  remove_ETUDIANT(@Req() req ,
  @Param('etudiantId') etudiantId : number){
    const adminId = req.user.payload.id;
    return this.adminService.DeleteEtudiantByAdmin(adminId,etudiantId);
  }
  @Roles('admin')
  @Delete('delete_centre/:centreId')
  remove_CENTRE(@Req() req ,
  @Param('centreId') centreId : number){
    const adminId = req.user.payload.id;
    return this.adminService.DeleteCentreByAdmin(adminId, centreId);
  }
  @Roles('admin')
  @Delete('delete_prof/:profId')
  remove_PROF(@Req() req ,
  @Param('profId') profId : number){
    const adminId = req.user.payload.id;
    return this.adminService.DeleteProfByAdmin(adminId, profId);
  }
}
