import { Injectable } from "@nestjs/common"
import { SignInDto } from "src/application/interfaces/dto/sign.in.dto"
import { IUseCase } from "src/application/interfaces/use_case/use.case"
import { AuthService } from "src/application/services/auth/auth.service"

@Injectable()
export class SignInCase implements IUseCase<SignInDto, object | null> {
  constructor(private readonly authService: AuthService) { }

  async handler({ email, password }: SignInDto): Promise<object> {
    const token = this.authService.signIn({ email, password })
    return token
  }
}
