/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewDto } from './dto/createReview.dto';
import { ModifyReviewDto } from './dto/modifyReview.dto';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    EtudiantId,
    FormationId,
  ) {
    return await this.reviewRepository.createReview(createReviewDto, EtudiantId, FormationId);


  }
  async modifyReview(reviewId: number,  idEtudiant: number,modifyReviewDto: ModifyReviewDto) {
    return await this.reviewRepository.modifyReview(reviewId, idEtudiant,modifyReviewDto);
  }
//test     hhhhhhh

  async deleteReview(reviewId: number, idEtudiant: number) {
    return await this.reviewRepository.deleteReview(reviewId,idEtudiant);
  }
}
