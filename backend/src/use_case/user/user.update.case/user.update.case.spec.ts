import { Test, TestingModule } from '@nestjs/testing';
import { UserUpdateCase } from './user.update.case';

describe('UserUpdateCase', () => {
  let provider: UserUpdateCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdateCase],
    }).compile();

    provider = module.get<UserUpdateCase>(UserUpdateCase);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
