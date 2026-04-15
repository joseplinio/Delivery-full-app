import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { HashService } from "../hash/hash.service"
import { UserMapper } from "src/application/mapper/user/user.mapper"
import { JwtService } from "@nestjs/jwt"
import { TyJwtPayload } from "src/application/types/auth.jwt.payload"

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly userMapper: UserMapper,
    private readonly jwtService: JwtService,
  ) { }
  async validateUser(email: string, pass: string): Promise<object> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) throw new UnauthorizedException("User not found!")

    const isPasswordMatch = await this.hashService.compareHash(
      pass,
      user.password,
    )
    if (!isPasswordMatch)
      throw new UnauthorizedException("Unvalid credantions!")

    const cleanUser = await this.userMapper.cleanUser(user)
    return cleanUser
  }

  async signIn(userData: { email: string; password: string }): Promise<object> {
    const user = await this.userRepository.findByEmail(userData.email)

    if (!user) throw new UnauthorizedException("User not found!")
    const payload: TyJwtPayload = { sub: user.id }

    const signInResult = {
      userId: user.id,
      access_token: this.jwtService.sign(payload),
    }

    return signInResult
  }
}
