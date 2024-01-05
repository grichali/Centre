import { Test, TestingModule } from '@nestjs/testing';
import { ReviewSeanceController } from './review_seance.controller';

describe('ReviewSeanceController', () => {
  let controller: ReviewSeanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewSeanceController],
    }).compile();

    controller = module.get<ReviewSeanceController>(ReviewSeanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
