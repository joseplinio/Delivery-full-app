import {
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	Length,
	IsEmail,
	IsOptional,
} from "class-validator"
import { Transform } from "class-transformer"

export class UpdateUserDto {
	@IsOptional()
	@IsNotEmpty({ message: "O nome é obrigatório." })
	@IsString({ message: "O nome deve ser uma string de texto." })
	@Length(3, 100, { message: "O nome deve ter entre 3 e 100 caracteres." })
	@Transform(({ value }: { value: string }) =>
		value
			.trim()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" "),
	)
	name: string

	@IsOptional()
	@IsNotEmpty({ message: "O e-mail é obrigatório." })
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail({}, { message: "O e-mail informado não é válido." })
	email: string
}
