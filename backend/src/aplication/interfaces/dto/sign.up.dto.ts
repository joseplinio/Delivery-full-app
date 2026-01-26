import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class SignUpDto {
	@IsString()
	name: string

	@IsString()
	email: string

	@IsNotEmpty()
	@IsString()
	@IsStrongPassword()
	password: string
}
