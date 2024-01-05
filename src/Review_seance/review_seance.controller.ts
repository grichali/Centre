import { Body, Controller, Delete, Param, Post, ValidationPipe } from '@nestjs/common';
import { ReviewSeanceService } from './review_seance.service';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { ModifyReviewDto } from 'src/review/dto/modifyReview.dto';

@Controller('review-seance')
export class ReviewSeanceController {
    constructor(private readonly reviewSeanceService: ReviewSeanceService) {}

    @Post('create/:id_etudiant/:id_seance')
    async createReview(
      @Body(ValidationPipe) createReviewDto: CreateReviewDto,
      @Param('id_etudiant') etudiantId: number,
      @Param('id_seance') seanceId: number,
    ) {
      return await this.reviewSeanceService.createReview(
        createReviewDto,
        etudiantId,
        seanceId,
      );
    }
    @Post('modify/:id')
    async modifyReviewDto(
      @Param('id') reviewtId: number,
      @Body(ValidationPipe) modifyReviewDto: ModifyReviewDto,
    ) {
      return await this.reviewSeanceService.modifyReview(reviewtId, modifyReviewDto);
    }
  
    @Delete('delete/:id')
    async deleteReview(@Param('id') reviewId: number): Promise<void> {
      await this.reviewSeanceService.deleteReview(reviewId);
    }
}
