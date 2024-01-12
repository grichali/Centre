/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ReviewSeance } from "./review_seance.entity";
import { SeanceRepository } from "src/seance/seance.repository";
import { EtudiantRepository } from "src/etudiant/etudiant.repository";
import { CreateReviewDto } from "src/review/dto/createReview.dto";
import { ModifyReviewDto } from "src/review/dto/modifyReview.dto";

@Injectable()
export class ReviewSeanceRepository extends Repository<ReviewSeance> {

  constructor(
    dataSource: DataSource,
    private readonly etudiantRepository: EtudiantRepository,
    private readonly seanceRepository: SeanceRepository,
  ) {
    super(ReviewSeance, dataSource.createEntityManager());
  }

  async createReview(
    createReviewDto: CreateReviewDto,
    EtudiantId: number,
    seanceId: number,
  ): Promise<ReviewSeance> {
    const { profRating, centreRating, profReview, centreReview } =    createReviewDto;

    const id_e = EtudiantId;
    const id_s = seanceId;
    const etudiant = await this.etudiantRepository.findOne({
      where: { id: id_e },
    });
    if (!etudiant) {
      throw new BadRequestException('Etudiant not found');
    }
    const seance = await this.seanceRepository.findOne({
      where: { id: id_s },
    });
    if (!seance) {
      throw new BadRequestException('Seance not found');
    }
    // const isSeanceFinished = await this.seanceRepository.isSeanceFinished(seance.id);
    // if (!isSeanceFinished) {
    //   throw new BadRequestException('Cannot create a review for an unfinished seance');
    // }
    const existingReview = await this.findOne({
      where: { etudiant: { id: etudiant.id }, seance: { id: seance.id } },
    });
    if (existingReview) {
      throw new BadRequestException('Etudiant has already submitted a review for this seance');
    }
    const review = new ReviewSeance();
    review.profRating = profRating;
    review.centreRating = centreRating;
    review.profReview = profReview;
    review.centreReview = centreReview;
    review.etudiant = etudiant;
    review.seance = seance;

    try {
      await this.save(review);
      return review;
    } catch (error) {
      console.log('Error creating Review:', error);
      throw new BadRequestException('Failed to create Review');
    }
  }

  async modifyReview(
    ReviewId: number,
    modifyReviewDto: ModifyReviewDto,
  ): Promise<ReviewSeance> {
    const review = await this.findOne({
      where: { id: ReviewId },
      relations: ['seance', 'etudiant'],
    });

    if (!review) {
      throw new BadRequestException('Review not found');
    }

    if (modifyReviewDto.centreRating !== undefined) {
      review.centreRating = modifyReviewDto.centreRating;
    }

    if (modifyReviewDto.profRating !== undefined) {
      review.profRating = modifyReviewDto.profRating;
    }

    if (modifyReviewDto.centreReview !== undefined) {
      review.centreReview = modifyReviewDto.centreReview;
    }

    if (modifyReviewDto.profReview !== undefined) {
      review.profReview = modifyReviewDto.profReview;
    }

    try {
      await this.save(review);
      return review;
    } catch (error) {
      console.error('Error modifying Review:', error);
      throw new BadRequestException('Failed to modify Review');
    }
  }


  async deleteReview(reviewId: number) {
    const review = await this.findOne({
      where: { id: reviewId },
    });

    if (!review) {
      throw new BadRequestException('Review not found !');
    }
    try {
      await this.remove(review);
    } catch (error) {
      console.error('Error deleting Review:', error);
      throw new BadRequestException('Failed to delete Review');
    }
  }
}
