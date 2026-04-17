import { Test, TestingModule } from '@nestjs/testing';
import { RefreshCase } from './refresh.case';

describe('RefreshCase', () => {
  let provider: RefreshCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefreshCase],
    }).compile();

    provider = module.get<RefreshCase>(RefreshCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
