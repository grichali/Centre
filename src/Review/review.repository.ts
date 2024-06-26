/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/createReview.dto';
import { ModifyReviewDto } from './dto/modifyReview.dto';
import { EtudiantRepository } from 'src/etudiant/etudiant.repository';
import { FormationRepository } from 'src/formation/formation.repository';

@Injectable()
export class ReviewRepository extends Repository<Review> {

  constructor(
    dataSource: DataSource,
    private readonly etudiantRepository: EtudiantRepository,
    private readonly formationRepository: FormationRepository,
  ) {
    super(Review, dataSource.createEntityManager());
  }

  async createReview(
    createReviewDto: CreateReviewDto,
    EtudiantId: number,
    FormationId: number,
  ): Promise<Review> {
    const { profRating, centreRating, profReview, centreReview } =    createReviewDto;

    const id_e = EtudiantId;
    const id_f = FormationId;
    const etudiant = await this.etudiantRepository.findOne({
      where: { id: id_e },
    });
    if (!etudiant) {
      throw new BadRequestException('Etudiant not found');
    }
    const formation = await this.formationRepository.findOne({
      where: { id: id_f },
    });
    if (!formation) {
      throw new BadRequestException('Formation not found');
    }
    const isFormationFinished = await this.formationRepository.isFormationFinished(formation.id);
    if (!isFormationFinished) {
      throw new BadRequestException('Cannot create a review for an unfinished formation');
    }
    const existingReview = await this.findOne({
      where: { etudiant: { id: etudiant.id }, formation: { id: formation.id } },
    });
    if (existingReview) {
      throw new BadRequestException('Etudiant has already submitted a review for this formation');
    }
    const review = new Review();
    review.profRating = profRating;
    review.centreRating = centreRating;
    review.profReview = profReview;
    review.centreReview = centreReview;
    review.etudiant = etudiant;
    review.formation = formation;

    try {
      await this.save(review);
      return review;
    } catch (error) {
      console.log('Error creating Review:', error);
      throw new BadRequestException('Failed to create Review');
    }
  }

 /* async modifyReview(
    ReviewId: number,
    modifyReviewDto: ModifyReviewDto,
  ): Promise<Review> {
    const review = await this.findOne({
      where: { id: ReviewId },
      relations: ['formation', 'etudiant'],
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
  }*/
  //test     hhhhhhh
  async modifyReview(
    ReviewId: number,
    idEtudiant: number,
    modifyReviewDto: ModifyReviewDto,
  ): Promise<Review> {
    const review = await this.findOne({
      where: { id: ReviewId, etudiant: { id: idEtudiant } },
      relations: ['formation', 'etudiant'],
    });

    if (!review) {
      throw new BadRequestException('Review not found for the specified student');
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



 /* async deleteReview(reviewId: number) {
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
  }*/
  async deleteReview(reviewId: number, idEtudiant: number) {
    const review = await this.findOne({
      where: { id: reviewId, etudiant: { id: idEtudiant } },
    });

    if (!review) {
      throw new BadRequestException('Review not found for the specified student!');
    }

    try {
      await this.remove(review);
    } catch (error) {
      console.error('Error deleting Review:', error);
      throw new BadRequestException('Failed to delete Review');
    }
  }

}
