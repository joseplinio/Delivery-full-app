import {
	IsNotEmpty,
	IsString,
	Length,
	IsEmail,
	IsOptional,
} from "class-validator"

import { Transform } from "class-transformer"
import { ApiPropertyOptional } from "@nestjs/swagger"

export class UpdateUserDto {

	@ApiPropertyOptional({
		description: "Nome completo do usuário",
		example: "Leo Silva",
		minLength: 3,
		maxLength: 100,
	})
	@IsOptional()
	@IsNotEmpty({ message: "O nome é obrigatório." })
	@IsString({ message: "O nome deve ser uma string de texto." })
	@Length(3, 100, { message: "O nome deve ter entre 3 e 100 caracteres." })
	@Transform(({ value }: { value: string }) =>
		value
			.trim()
			.split(" ")
			.map(
				(word) =>
					word.charAt(0).toUpperCase() +
					word.slice(1).toLowerCase(),
			)
			.join(" "),
	)
	name!: string

	@ApiPropertyOptional({
		description: "Novo e-mail do usuário",
		example: "leo@email.com",
	})
	@IsOptional()
	@IsNotEmpty({ message: "O e-mail é obrigatório." })
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail({}, { message: "O e-mail informado não é válido." })
	email!: string
}
