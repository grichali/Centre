import { IsString } from 'class-validator';

export class LogInDTO{

    @IsString()
    readonly email : string ;

    @IsString()
    readonly password : string ;
} 