import { Injectable, InternalServerErrorException } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { SignUpDto } from "src/application/interfaces/dto/sign.up.dto"
import { IUseCase } from "src/application/interfaces/use_case/use.case"
import { UserMapper } from "src/application/mapper/user/user.mapper"
import { HashService } from "src/application/services/hash/hash.service"

@Injectable()
export class SignUpCase implements IUseCase<SignUpDto, object | null> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userMapper: UserMapper,
		private readonly hashService: HashService,
	) {}

	async handler(body: SignUpDto): Promise<object | null> {
		try {
			const userBody = await this.userMapper.upDtoToDomain(body)
			const hashedPassword = await this.hashService.hash(userBody.password)

			const user = await this.userRepository.create({
				...userBody,
				password: hashedPassword,
			})

			if (!user) throw InternalServerErrorException
			return { message: `The user ${user.name} has been created` }
		} catch (err) {
			throw err
		}
	}
}
