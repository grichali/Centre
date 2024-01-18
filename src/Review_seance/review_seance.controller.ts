/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Param, Post, UseGuards, ValidationPipe,Req } from '@nestjs/common';
import { ReviewSeanceService } from './review_seance.service';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { ModifyReviewDto } from 'src/review/dto/modifyReview.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';

@Controller('review-seance')
@UseGuards(JwtAuthGuard,RolesGuard)

export class ReviewSeanceController {
    constructor(private readonly reviewSeanceService: ReviewSeanceService) {}
    @Roles('etudiant')
    @Post('create/:id_seance')
    async createReview(
      @Body(ValidationPipe) createReviewDto: CreateReviewDto,
      @Req() req,
      @Param('id_seance') seanceId: number,
    ) {
      const etudiantId =req.user.payload.id
      return await this.reviewSeanceService.createReview(
        createReviewDto,
        etudiantId,
        seanceId,
      );
    }
    @Roles('etudiant')
    @Post('modify/:id')
    async modifyReviewDto(
      @Param('id') reviewtId: number,
      @Body(ValidationPipe) modifyReviewDto: ModifyReviewDto,
      @Req() req ,
    ) {
      const EtudiantId = req.user.payload.id
      return await this.reviewSeanceService.modifyReview(reviewtId, EtudiantId,modifyReviewDto);
    }
    @Roles('etudiant','admin')
    @Delete('delete/:id')
    async deleteReview(@Param('id') reviewId: number,
    @Req() req ,

    ): Promise<void> {
      const idEtudiant = req.user.payload.id
      await this.reviewSeanceService.deleteReview(reviewId, idEtudiant );
    }
}
