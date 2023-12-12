import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
} from 'class-validator';

export class ModifySeanceDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  date?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prixSeance?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  placeDisponible?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  time: string;
}
