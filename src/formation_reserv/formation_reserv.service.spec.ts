import { Test, TestingModule } from '@nestjs/testing';
import { FormationReservService } from './formation_reserv.service';

describe('FormationReservService', () => {
  let service: FormationReservService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormationReservService],
    }).compile();

    service = module.get<FormationReservService>(FormationReservService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
