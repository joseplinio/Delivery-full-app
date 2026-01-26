import { Controller, Post, Body } from "@nestjs/common"
import { SignInDto } from "src/aplication/interfaces/dto/sign.in.dto"
import { SignUpDto } from "src/aplication/interfaces/dto/sign.up.dto"
import type { IUseCase } from "src/aplication/interfaces/use_case/use.case"
import { UserEntity } from "src/entities/user.entity"

@Controller("auth")
export class AuthController {
	constructor(
		private readonly signUpCase: IUseCase<SignUpDto, UserEntity>,
		private readonly signInCase: IUseCase<SignInDto, UserEntity>,
	) {}

	@Post()
	async signUp(@Body() signUpDto: SignUpDto) {
		return this.signUpCase.handler(signUpDto)
	}

	@Post()
	async signIn(@Body() signInDto: SignInDto) {
		return this.signInCase.handler(signInDto)
	}
}
