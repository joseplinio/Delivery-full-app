import { Injectable } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { IUseCase } from "src/application/interfaces/use_case/use.case"
import { UserMapper } from "src/application/mapper/user/user.mapper"

@Injectable()
export class GetAccountCase implements IUseCase<string, object> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userMapper: UserMapper,
  ) { }
  async handler(id: string): Promise<object> {
    try {
      const getAccountCaseResult = await this.userRepository.findById(id)
      if (!getAccountCaseResult) throw new Error("There's no id || valide id")

      const user = await this.userMapper.cleanUser(getAccountCaseResult)

      return user
    } catch (err) {
      throw err
    }
  }
}
