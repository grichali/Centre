/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

export class CreateSeanceDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  duration: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixSeance: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  placeDisponible: number;

}

