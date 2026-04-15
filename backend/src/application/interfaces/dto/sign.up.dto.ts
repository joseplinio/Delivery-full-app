import {
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	Length,
	IsEmail,
} from "class-validator"

import { Transform } from "class-transformer"
import { randomUUID } from "crypto"
import { ApiProperty } from "@nestjs/swagger"

export class SignUpDto {
	id: string = randomUUID()

	@ApiProperty({
		description: "Nome completo do usuário",
		example: "leo",
		minLength: 3,
		maxLength: 100,
	})
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

	@ApiProperty({
		description: "E-mail do usuário",
		example: "leo@email.com",
	})
	@IsNotEmpty({ message: "O e-mail é obrigatório." })
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail({}, { message: "O e-mail informado não é válido." })
	email!: string

	@ApiProperty({
		description: "Senha forte do usuário",
		example: "Abcd1234!!@@",
		minLength: 12,
	})
	@IsNotEmpty({ message: "A senha é obrigatória." })
	@IsStrongPassword(
		{
			minLength: 12,
			minLowercase: 4,
			minNumbers: 2,
			minSymbols: 3,
			minUppercase: 3,
		},
		{
			message:
				"A senha deve ter no mínimo 12 caracteres, incluindo pelo menos 4 letras minúsculas, 3 letras maiúsculas, 2 números e 3 símbolos especiais.",
		},
	)
	password!: string
}
