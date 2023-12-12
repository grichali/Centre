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
  async modifyReview(reviewId: number, modifyReviewDto: ModifyReviewDto) {
    return await this.reviewRepository.modifyReview(reviewId, modifyReviewDto);
  }

  async deleteReview(reviewId: number) {
    return await this.reviewRepository.deleteReview(reviewId);
  }
}
 