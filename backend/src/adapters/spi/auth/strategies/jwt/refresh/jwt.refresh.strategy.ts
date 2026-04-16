import { Inject, Injectable } from "@nestjs/common"
import type { ConfigType } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-jwt"
import jwtRefreshConfig from "src/application/services/jwt/config/jwt.refresh.config"
import { ExtractJwt } from "passport-jwt"
import { TyJwtPayload } from "src/application/types/auth.jwt.payload"

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	"jwt-refresh",
) {
	constructor(
		@Inject(jwtRefreshConfig.KEY)
		private readonly jwtRefreshConfigService: ConfigType<
			typeof jwtRefreshConfig
		>,
	) {
		const secret = jwtRefreshConfigService.secret

		if (!secret || typeof secret !== "string") {
			throw new Error("JWT secret must be a defined string")
		}
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret,
		})
	}
	async validate(payload: TyJwtPayload): Promise<object> {
		return { userId: payload.sub }
	}
}
