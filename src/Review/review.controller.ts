import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createreview.dto';
import { ModifyReviewDto } from './dto/modifyreview.dto';
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create/:id_etudiant/:id_formation')
  async createReview(
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
    @Param('id_etudiant') etudiantId: number,
    @Param('id_formation') formationId: number,
  ) {
    return await this.reviewService.createReview(
      createReviewDto,
      etudiantId,
      formationId,
    );
  }
  @Post('modify/:id')
  async modifyReviewDto(
    @Param('id') reviewtId: number,
    @Body(ValidationPipe) modifyReviewDto: ModifyReviewDto,
  ) {
    return await this.reviewService.modifyReview(reviewtId, modifyReviewDto);
  }

  @Delete('delete/:id')
  async deleteReview(@Param('id') reviewId: number): Promise<void> {
    await this.reviewService.deleteReview(reviewId);
  }
}
