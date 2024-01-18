/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
  ValidationPipe,Req
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/createreview.dto';
import { ModifyReviewDto } from './dto/modifyreview.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { RolesGuard } from 'src/jwt/roles.guard';
import { Roles } from 'src/Roles/roles.decorator';




@Controller('review_formation')
@UseGuards(JwtAuthGuard,RolesGuard)

export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}
  @Roles('etudiant')
  @Post('create/:id_formation')
  async createReview(
    @Body(ValidationPipe) createReviewDto: CreateReviewDto,
    @Req() req ,
    @Param('id_formation') formationId: number,
  ) { const etudiantId = req.user.payload.id
    return await this.reviewService.createReview(
      createReviewDto,
      etudiantId,
      formationId,
    );
  }
  @Roles('etudiant')
  @Post('modify/:id')
  async modifyReviewDto(
    @Param('id') reviewtId: number,
    @Body(ValidationPipe) modifyReviewDto: ModifyReviewDto,
    @Req() req ,
  ) {
    const idEtudiant = req.user.payload.id
    return await this.reviewService.modifyReview(reviewtId, idEtudiant,modifyReviewDto);
  }
  @Roles('etudiant','admin')
  @Delete('delete/:id')
  async deleteReview(@Param('id') reviewId: number,@Req() req ,): Promise<void> {
    const idEtudiant = req.user.payload.id
    await this.reviewService.deleteReview(reviewId,idEtudiant);
  }
}
