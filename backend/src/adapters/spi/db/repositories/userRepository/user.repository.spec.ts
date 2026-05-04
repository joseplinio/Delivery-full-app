import { Test, TestingModule } from "@nestjs/testing"
import { UserRepository } from "./user.repository"
import type { UserEntity } from "src/entities/user/user.entity"

// NOTE: I need to see the why my tests are thorowig error and
// I am not sure but I think I need to poor the Prisma righ here 
describe("UserRepository", () => {
  let userReposiotory: UserRepository
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            findByEmail: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile()

    userReposiotory = module.get<UserRepository>(UserRepository)
  })
  describe("Testing the userReposiotory's method", () => {
    it("it should create a user", async () => {
      const userData: UserEntity = {
        id: "some-user-id",
        name: "jose",
        email: "joseplinio@com.com",
        password: "hhhh11@@@UUU",
      }
      const expectedResult = {
        id: "some-user-id",
        name: "jose",
        email: "joseplinio@com.com",
        password: "hhhh11@@@UUU",
      }

      jest.spyOn(userReposiotory, "create").mockResolvedValue(userData)
      const result = await userReposiotory.create(userData)

      expect(userReposiotory.create).toHaveBeenCalledWith(userData)
      expect(result).toEqual(expectedResult)
    })
  })
})
