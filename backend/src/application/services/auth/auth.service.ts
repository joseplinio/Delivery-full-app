import { Injectable, UnauthorizedException } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { HashService } from "../hash/hash.service"
import { UserMapper } from "src/application/mapper/user/user.mapper"
import { JwtService } from "@nestjs/jwt"
import { Inject } from "@nestjs/common"
import type { ConfigType } from "@nestjs/config"
import { TyJwtPayload } from "src/application/types/auth.jwt.payload"
import jwtRefreshConfig from "../jwt/config/jwt.refresh.config"

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly hashService: HashService,
		private readonly userMapper: UserMapper,
		private readonly jwtService: JwtService,
		@Inject(jwtRefreshConfig.KEY)
		private readonly refreshJwtConfigService: ConfigType<
			typeof jwtRefreshConfig
		>,
	) {}
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

		const accessToken = this.jwtService.sign(payload)
		const refreshToken = this.jwtService.sign(
			payload,
			this.refreshJwtConfigService,
		)

		const signInResult = {
			userId: user.id,
			access_token: accessToken,
			refresh_token: refreshToken,
		}

		return signInResult
	}

	async refresToken(userId: string): Promise<object> {
		const payload: TyJwtPayload = { sub: userId }
		const accessToken = this.jwtService.sign(payload)

		const refreshTokenResult = {
			userId: userId,
			access_token: accessToken,
		}

		return refreshTokenResult
	}
}
