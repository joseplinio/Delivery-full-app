import { Injectable } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { SignInDto } from "src/application/interfaces/dto/sign.in.dto"
import { IUseCase } from "src/application/interfaces/use_case/use.case"
import { UserEntity } from "src/entities/user/user.entity"

@Injectable()
export class SignInCase implements IUseCase<SignInDto, UserEntity> {
	constructor(private readonly userRepository: UserRepository) {}

	async handler(body: SignInDto): Promise<UserEntity> {
		try {
			console.log(body)
			return {} as UserEntity
		} catch (err) {
			throw new Error(err)
		}
	}
}
