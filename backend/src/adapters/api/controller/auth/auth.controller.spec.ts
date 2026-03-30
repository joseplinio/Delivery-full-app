import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { SignUpCase } from "src/use_case/auth/sign.up.case"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { SignUpDto } from "src/application/interfaces/dto/sign.up.dto"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"

describe("AuthController", () => {
  let controller: AuthController
  let dtoValidatorService: DtoValidatorService
  let signUpCase: SignUpCase
  let signInCase: SignInCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: SignUpCase, useValue: { handler: jest.fn() } },
        { provide: SignInCase, useValue: { handler: jest.fn() } },
        { provide: DtoValidatorService, useValue: { valideDto: jest.fn() } },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    signUpCase = module.get<SignUpCase>(SignUpCase)
    signInCase = module.get<SignInCase>(SignInCase)
    dtoValidatorService = module.get<DtoValidatorService>(DtoValidatorService)
  })

  describe("Teting auth's routers", () => {
    describe("SingUp/", () => {
      it("it should sign up a user", async () => {
        const signUpBody = {
          name: "Test da Silva",
          email: "someone@com.com",
          password: "hhhh11@@@UUU",
        } as SignUpDto

        const expectedResult = {}

        jest
          .spyOn(dtoValidatorService, "valideDto")
          .mockResolvedValue(signUpBody)

        jest.spyOn(signUpCase, "handler").mockResolvedValue()

        const result = await controller.signUp(signUpBody)

        expect(dtoValidatorService.valideDto).toHaveBeenCalledWith(
          SignUpDto,
          signUpBody,
        )
        expect(signUpCase.handler).toHaveBeenCalledWith(signUpBody)
        expect(result).toEqual(expectedResult)
      })
    })
  })
})
