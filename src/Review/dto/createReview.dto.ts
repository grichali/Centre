import { IsNotEmpty, IsNumber, Min, IsString, Max } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  profRating: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  centreRating: number;

  @IsNotEmpty()
  @IsString()
  profReview: string;

  @IsNotEmpty()
  @IsString()
  centreReview: string;
}
