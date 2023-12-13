import { IsString } from 'class-validator';
import { CreatUserDto } from 'src/User/dto/create-user.dto';

export class CreatCentreDto extends CreatUserDto {
  @IsString()
  adresse: string;

  @IsString()
  description: string;
}
