
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
} from 'class-validator';

export class ModifyFormationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  Type?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prix?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
