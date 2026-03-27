import { Injectable, NotFoundException } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { IUseCase } from "src/application/interfaces/use_case/use.case"
import { UpdateUserInput } from "src/application/interfaces/use_case/user/update.user.input"
import { UserMapper } from "src/application/mapper/user/user.mapper"

@Injectable()
export class UpdateUserCase implements IUseCase<object, object | null> {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly userMapper: UserMapper,
	) {}

	async handler({ id, ...data }: UpdateUserInput): Promise<object | null> {
		try {
			const user = await this.userRepository.findOne(id)
			if (!user) {
				throw new NotFoundException("usuario nâo encontrado")
			}

			const updateUser = await this.userRepository.update(id, {
				...data,
			})

			const updateUserResult = await this.userMapper.cleanUser(updateUser)
			return updateUserResult

		} catch (err) {
			throw err
		}
	}
}
