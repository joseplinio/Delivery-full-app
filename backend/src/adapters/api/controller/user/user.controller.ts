import { Body, Controller, Param, Patch } from "@nestjs/common"
import { UpdateUserDto } from "src/application/interfaces/dto/update.use.dto"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"
import { UpdateUserCase } from "src/use_case/user/user.update.case/update.user.case"

@Controller("user")
export class UserController {
	constructor(
		private readonly userUpdateCase: UpdateUserCase,
		private readonly dtoValidatorService: DtoValidatorService,
	) {}

	@Patch("update/:id")
	async update(
		@Param("id") id: string,
		@Body() updateBody: UpdateUserDto,
	): Promise<object | null> {
		try {
			const updateInstance =
				await this.dtoValidatorService.valideDto<UpdateUserDto>(
					UpdateUserDto,
					updateBody,
				)
			const updateResult = await this.userUpdateCase.handler({
				id,
				...updateInstance,
			})
			return updateResult
		} catch (err) {
			throw err
		}
	}
}
