import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateAdminDto  {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(3)
  acces_level?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  role?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  permission?: string;
}
