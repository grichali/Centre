import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  IsString
} from 'class-validator';
import { Type } from 'class-transformer';


export class ModifySalleDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  nombrePlace?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixHeure?: number;

  @IsString()
  description : String ;
}
