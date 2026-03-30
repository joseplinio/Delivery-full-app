import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { UpdateUserCase } from "src/use_case/user/user.update.case/update.user.case"
import { UpdateUserInput } from "src/application/interfaces/use_case/user/update.user.input"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"
import { UpdateUserDto } from "src/application/interfaces/dto/update.use.dto"

describe("UserController", () => {
  let controller: UserController
  let updateUserCase: UpdateUserCase
  let dtoValidatorService: DtoValidatorService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UpdateUserCase, useValue: { handler: jest.fn() } },
        { provide: DtoValidatorService, useValue: { valideDto: jest.fn() } },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    updateUserCase = module.get<UpdateUserCase>(UpdateUserCase)
    dtoValidatorService = module.get<DtoValidatorService>(DtoValidatorService)
  })
  describe("Testing the routers", () => {
    it("update router should update the user", async () => {
      const updateUserInput = {
        id: "d17fbc9e-9973-4d11-a93c-e7d4ee4a0246",
        name: "Test da Silva",
        email: "someone@com.com",
      } as UpdateUserInput

      const expectedResult = {
        name: "Test da Silva",
        email: "someone@test.com",
      }

      jest.spyOn(dtoValidatorService, "valideDto").mockResolvedValue({
        name: updateUserInput.name,
        email: updateUserInput.email,
      })

      jest.spyOn(updateUserCase, "handler").mockResolvedValue(expectedResult)

      const result = await controller.update(updateUserInput.id, {
        ...updateUserInput,
      })

      expect(dtoValidatorService.valideDto).toHaveBeenCalledWith(
        UpdateUserDto,
        updateUserInput,
      )
      expect(updateUserCase.handler).toHaveBeenCalledWith(updateUserInput)
      expect(result).toEqual(expectedResult)
    })
  })
})
