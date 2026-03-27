import { Test, TestingModule } from '@nestjs/testing';
import { DtoValidatorService } from './dto.validator.service';

describe('DtoValidatorService', () => {
  let service: DtoValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DtoValidatorService],
    }).compile();

    service = module.get<DtoValidatorService>(DtoValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
