import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { SignUpCase } from "src/use_case/auth/sign.up.case"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { SignUpDto } from "src/application/interfaces/dto/sign.up.dto"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"
import { GetAccountCase } from "src/use_case/auth/get.account.case"
import { RefreshCase } from "src/use_case/auth/refresh.case/refresh.case"
import { SignInDto } from "src/application/interfaces/dto/sign.in.dto"

describe("AuthController", () => {
  let authController: AuthController
  let signUpCase: SignUpCase
  let signInCase: SignInCase
  let getAccountCase: GetAccountCase
  let refreshCase: RefreshCase
  let dtoValidatorService: DtoValidatorService
  let requestMock = {
    user: {
      userId: "some-user-id",
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: SignUpCase, useValue: { handler: jest.fn() } },
        { provide: SignInCase, useValue: { handler: jest.fn() } },
        { provide: RefreshCase, useValue: { handler: jest.fn() } },
        { provide: GetAccountCase, useValue: { handler: jest.fn() } },
        { provide: DtoValidatorService, useValue: { valideDto: jest.fn() } },
      ],
    }).compile()

    authController = module.get<AuthController>(AuthController)
    signUpCase = module.get<SignUpCase>(SignUpCase)
    signInCase = module.get<SignInCase>(SignInCase)
    getAccountCase = module.get<GetAccountCase>(GetAccountCase)
    refreshCase = module.get<RefreshCase>(RefreshCase)
    dtoValidatorService = module.get<DtoValidatorService>(DtoValidatorService)
  })

  describe("Teting auth's routers", () => {
    describe("sing-up/", () => {
      it("it should register a user", async () => {
        const signUpBody = {
          name: "Test da Silva",
          email: "someone@com.com",
          password: "hhhh11@@@UUU",
        } as SignUpDto

        jest
          .spyOn(dtoValidatorService, "valideDto")
          .mockResolvedValue(signUpBody)

        jest.spyOn(signUpCase, "handler").mockResolvedValue(undefined)

        const result = await authController.signUp(signUpBody)

        expect(dtoValidatorService.valideDto).toHaveBeenCalledWith(
          SignUpDto,
          signUpBody,
        )
        expect(signUpCase.handler).toHaveBeenCalledWith(signUpBody)
        expect(result).toEqual(undefined)
      })
    })

    describe("sing-in/", () => {
      it("it should sign in a user", async () => {
        const signInBody = {
          email: "someone@com.com",
          password: "hhhh11@@@UUU",
        } as SignInDto

        const expectedResult = {
          userId: "some-user-id",
          access_token: "access_token",
          refresh_token: "refresh_token",
        }

        jest
          .spyOn(dtoValidatorService, "valideDto")
          .mockResolvedValue(signInBody)

        jest.spyOn(signInCase, "handler").mockResolvedValue(expectedResult)

        const result = await authController.signIn(signInBody)
        expect(dtoValidatorService.valideDto).toHaveBeenCalledWith(
          SignInDto,
          signInBody,
        )
        expect(signInCase.handler).toHaveBeenCalledWith(signInBody)
        expect(result).toEqual(expectedResult)
      })
    })

    describe("account/", () => {
      // NOTE: I need to study more about it, becouse I most need to test the Guards / Strategies
      it("it should get the user's account", async () => {
        const expectedResult = {
          name: "José Plinio",
          email: "someone@com.com",
        }

        jest.spyOn(getAccountCase, "handler").mockResolvedValue(expectedResult)

        const result = await authController.account(requestMock)

        expect(getAccountCase.handler).toHaveBeenCalledWith(
          requestMock.user.userId,
        )
        expect(result).toEqual(expectedResult)
      })
    })

    describe("refresh/", () => {
      // NOTE: I need to study more about it, becouse I most need to test the Guards / Strategies
      it("it should give a access_token for the user", async () => {
        const expectedResult = {
          userId: "some-user-id",
          access_token: "access_token",
        }

        jest.spyOn(refreshCase, "handler").mockResolvedValue(expectedResult)

        const result = await authController.refresh(requestMock)

        expect(refreshCase.handler).toHaveBeenCalledWith(
          requestMock.user.userId,
        )
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
