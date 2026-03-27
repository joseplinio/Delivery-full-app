import { Controller, Post, Body } from "@nestjs/common"
import { SignInDto } from "src/application/interfaces/dto/sign.in.dto"
import { SignUpDto } from "src/application/interfaces/dto/sign.up.dto"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { SignUpCase } from "src/use_case/auth/sign.up.case"

@Controller("auth")
export class AuthController {
	constructor(
		private readonly signUpCase: SignUpCase,
		private readonly signInCase: SignInCase,
		private readonly dtoValidatior: DtoValidatorService,
	) {}

	@Post("signup")
	async signUp(@Body() signUpBody: SignUpDto) {
		try {
			const signUpDto = await this.dtoValidatior.valideDto<SignUpDto>(
				SignUpDto,
				signUpBody,
			)
			const signUpResult = await this.signUpCase.handler(signUpDto)

			return signUpResult
		} catch (err) {
			throw err
		}
	}

	@Post("signin")
	async signIn(@Body() signInBody: SignInDto) {
		try {
			const signInDto = await this.dtoValidatior.valideDto<SignInDto>(
				SignInDto,
				signInBody,
			)
			const signInResult = await this.signInCase.handler(signInDto)

			return signInResult
		} catch (err) {
			throw err
		}
	}
}
