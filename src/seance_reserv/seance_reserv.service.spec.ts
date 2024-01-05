import { Test, TestingModule } from '@nestjs/testing';
import { SeanceReservService } from './seance_reserv.service';

describe('SeanceReservService', () => {
  let service: SeanceReservService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeanceReservService],
    }).compile();

    service = module.get<SeanceReservService>(SeanceReservService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
