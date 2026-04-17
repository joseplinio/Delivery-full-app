import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import { Transform } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"

export class SignInDto {

  @ApiProperty({
    description: "E-mail do usuário para autenticação",
    example: "leo@email.com",
  })
  @IsEmail({}, { message: "O e-mail informado não é válido." })
  @IsNotEmpty({ message: "O e-mail é obrigatório." })
  @IsString({ message: "O e-mail deve ser uma string." })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email!: string

  @ApiProperty({
    description: "Senha do usuário",
    example: "Abcd1234!!@@",
  })
  @IsNotEmpty({ message: "A senha é obrigatória." })
  @IsString({ message: "A senha deve ser uma string." })
  password!: string
}
