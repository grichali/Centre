import { Test, TestingModule } from '@nestjs/testing';
import { ProfController } from './prof.controller';

describe('ProfController', () => {
  let controller: ProfController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfController],
    }).compile();

    controller = module.get<ProfController>(ProfController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
