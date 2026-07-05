import { SignInDto } from "src/application/interfaces/dto/sign.in.dto"
import { SignInCase } from "./sign.in.case"
import { Test, TestingModule } from "@nestjs/testing"
import { AuthService } from "src/application/services/auth/auth.service"
import { UnauthorizedException } from "@nestjs/common"

describe("SingInCase", () => {
  let signInCase: SignInCase
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SignInCase,
          useValue: { handler: jest.fn() },
        },
        {
          provide: AuthService,
          useValue: { signIn: jest.fn() },
        },
      ],
    }).compile()

    signInCase = module.get<SignInCase>(SignInCase)
    authService = module.get<AuthService>(AuthService)
  })

  describe("Testing the SingInCase", () => {
    it("it should return the tokens", async () => {
      const userData: SignInDto = {
        email: "test@test.domain",
        password: "mmmmMMM22@@@",
      }

      const expectedResult = {
        userId: "some-user-id",
        access_token: "access_token",
        refresh_token: "refresh_token",
      }

      jest.spyOn(signInCase, "handler").mockResolvedValue(expectedResult)

      const result = await signInCase.handler(userData)

      expect(signInCase.handler).toHaveBeenCalledWith(userData)
      expect(result).toEqual(expectedResult)
    })
  })
})
