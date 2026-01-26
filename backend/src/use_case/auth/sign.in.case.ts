import { Injectable } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { IUseCase } from "src/aplication/interfaces/use_case/use.case"
import { UserEntity } from "src/entities/user.entity"

@Injectable()
export class SignUpCase implements IUseCase<SignInDto, UserEntity> {
  constructor(private readonly userRepository: UserRepository) { }

  async handler(body: SignInDto): Promise<UserEntity> {
    const signUpCaseResult = await this.userRepository.create(body)
    return signUpCaseResult
  }
}
