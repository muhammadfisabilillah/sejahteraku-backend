import { Test, TestingModule } from '@nestjs/testing';
import { AiConsultantController } from './ai-consultant.controller';
import { AiConsultantService } from './ai-consultant.service';

describe('AiConsultantController', () => {
  let controller: AiConsultantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiConsultantController],
      providers: [AiConsultantService],
    }).compile();

    controller = module.get<AiConsultantController>(AiConsultantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
