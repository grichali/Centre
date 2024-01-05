import { Test, TestingModule } from '@nestjs/testing';
import { SeanceReservController } from './seance_reserv.controller';

describe('SeanceReservController', () => {
  let controller: SeanceReservController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeanceReservController],
    }).compile();

    controller = module.get<SeanceReservController>(SeanceReservController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
