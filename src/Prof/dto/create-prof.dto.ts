import { IsString } from "class-validator";
import { CreatUserDto } from "src/User/dto/create-user.dto";



export class CreatProfDto extends CreatUserDto{ 

    @IsString()
    description : string ;

}