import { Controller, Post, Body } from "@nestjs/common"
import { SignInDto } from "src/application/interfaces/dto/sign-in-dto"
import { SignUpDto } from "src/application/interfaces/dto/sign-up-dto"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { SignUpCase } from "src/use_case/auth/sign.up.case"

@Controller("auth")
export class AuthController {
	constructor(
		private readonly signUpCase: SignUpCase,
		private readonly signInCase: SignInCase,
	) {}

	@Post("signup")
	async signUp(@Body() signUpDto: SignUpDto) {
		const signUpResult = await this.signUpCase.handler(signUpDto)
		return signUpResult
	}

	@Post("signin")
	async signIn(@Body() signInDto: SignInDto) {
		const signInResult = await this.signInCase.handler(signInDto)
		return signInResult
	}
}
