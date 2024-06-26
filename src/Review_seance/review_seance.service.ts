/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ReviewSeanceRepository } from './review_seance.repository';
import { CreateReviewDto } from 'src/review/dto/createReview.dto';
import { ModifyReviewDto } from 'src/review/dto/modifyReview.dto';

@Injectable()
export class ReviewSeanceService {

    constructor(private readonly reviewSeanceRepository: ReviewSeanceRepository) {}

  async createReview(
    createReviewDto: CreateReviewDto,
    EtudiantId,
    seanceId,
  ) {
    return await this.reviewSeanceRepository.createReview(createReviewDto, EtudiantId, seanceId);


  }
  //test     hhhhhhh
  async modifyReview(reviewId: number,idEtudiant: number, modifyReviewDto: ModifyReviewDto) {
    return await this.reviewSeanceRepository.modifyReview(reviewId,idEtudiant, modifyReviewDto);
  }

  async deleteReview(reviewId: number, idEtudiant: number) {
    return await this.reviewSeanceRepository.deleteReview(reviewId,idEtudiant);
  }

}
