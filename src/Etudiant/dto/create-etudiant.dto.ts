/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { CreatUserDto } from "src/User/dto/create-user.dto";

export class CreatEtudiantDto extends CreatUserDto{

    @IsString()
    niveau : string ;

}