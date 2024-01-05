import { Test, TestingModule } from '@nestjs/testing';
import { ReviewSeanceService } from './review_seance.service';

describe('ReviewSeanceService', () => {
  let service: ReviewSeanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewSeanceService],
    }).compile();

    service = module.get<ReviewSeanceService>(ReviewSeanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
