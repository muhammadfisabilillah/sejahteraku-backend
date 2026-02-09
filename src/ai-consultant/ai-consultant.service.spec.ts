import { Test, TestingModule } from '@nestjs/testing';
import { AiConsultantService } from './ai-consultant.service';

describe('AiConsultantService', () => {
  let service: AiConsultantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AiConsultantService],
    }).compile();

    service = module.get<AiConsultantService>(AiConsultantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
