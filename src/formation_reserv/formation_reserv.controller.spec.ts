import { Test, TestingModule } from '@nestjs/testing';
import { FormationReservController } from './formation_reserv.controller';

describe('FormationReservController', () => {
  let controller: FormationReservController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormationReservController],
    }).compile();

    controller = module.get<FormationReservController>(FormationReservController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
