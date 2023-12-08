import { IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

export class CreateFormationDto {
  @IsNotEmpty()
  @IsString()
  Type: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  prix: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
