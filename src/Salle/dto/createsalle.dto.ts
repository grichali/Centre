import { IsNotEmpty, IsNumber, Min, IsArray, ArrayMinSize, ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';


export class CreateSalleDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  nombrePlace: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixHeure: number;

  @IsString()
  description : string ; 
}
