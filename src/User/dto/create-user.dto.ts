import { IsString } from "class-validator";

export class CreatUserDto { 

    @IsString()
    nom : string;
 
    @IsString()
    prenom : string ;

    @IsString()
    tel : string ;

    @IsString()
    email: string ;

    @IsString()
    password: string ;
    
}