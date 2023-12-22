import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
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
  @Delete('delete_etudiant/:adminId/:etudiantId')
  remove_ETUDIANT(@Param('adminId')adminId :number ,
  @Param('etudiantId') etudiantId : number){
    return this.adminService.DeleteEtudiantByAdmin(adminId,etudiantId);
  }
  @Delete('delete_centre/:adminId/:centreId')
  remove_CENTRE(@Param('adminId')adminId :number ,
  @Param('centreId') centreId : number){
    return this.adminService.DeleteCentreByAdmin(adminId, centreId);
  }

  @Delete('delete_prof/:adminId/:profId')
  remove_PROF(@Param('adminId')adminId :number ,
  @Param('profId') profId : number){
    return this.adminService.DeleteProfByAdmin(adminId, profId);
  }
}
