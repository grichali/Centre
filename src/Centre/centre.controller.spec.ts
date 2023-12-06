import { Test, TestingModule } from '@nestjs/testing';
import { CentreController } from './centre.controller';

describe('CentreController', () => {
  let controller: CentreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentreController],
    }).compile();

    controller = module.get<CentreController>(CentreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
