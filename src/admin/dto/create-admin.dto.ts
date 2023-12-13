import { IsNumber, IsString, } from 'class-validator';
import { CreatUserDto } from 'src/User/dto/create-user.dto';

export class CreateAdminDto extends CreatUserDto {
  @IsNumber()
  acces_level: number;

  @IsString()
  role: string;

  @IsString()
  permission: string;
}
