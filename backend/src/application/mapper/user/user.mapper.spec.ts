import { Test, TestingModule } from '@nestjs/testing';
import { userMapper } from './user-mapper';

describe('UserMapper', () => {
  let provider: userMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [userMapper],
    }).compile();

    provider = module.get<userMapper>(userMapper);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
