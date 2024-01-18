/* eslint-disable prettier/prettier */
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  Min,
  IsString,
  Max,
} from 'class-validator';

export class ModifyReviewDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  profRating?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  centreRating?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  profReview?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  centreReview?: string;
}
