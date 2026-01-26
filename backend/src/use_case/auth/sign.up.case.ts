import { Injectable } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { SignUpDto } from "src/aplication/interfaces/dto/sign.up.dto"
import { IUseCase } from "src/aplication/interfaces/use_case/use.case"
import { UserMapper } from "src/aplication/mapper/user-mapper/user-mapper"
import { UserEntity } from "src/entities/user.entity"

@Injectable()
export class SignUpCase implements IUseCase<SignUpDto, UserEntity> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userMapper: UserMapper,
	) {}

	async handler(body: SignUpDto): Promise<UserEntity> {
		const user = await this.userMapper.toEntity(body)
		const signUpCaseResult = await this.userRepository.create(user)

		return signUpCaseResult
	}
}
