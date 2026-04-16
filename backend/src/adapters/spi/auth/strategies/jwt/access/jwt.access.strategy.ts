import type { ConfigType } from "@nestjs/config"
import type { TyJwtPayload } from "src/application/types/auth.jwt.payload"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import jwtConfig from "src/application/services/jwt/config/jwt.access.config"
import { Inject, Injectable } from "@nestjs/common"
import accessJwtConfig from "src/application/services/jwt/config/jwt.access.config"
import jwtAccessConfig from "src/application/services/jwt/config/jwt.access.config"

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, "jwt-access") {
	constructor(
		@Inject(jwtAccessConfig.KEY)
		private readonly jwtConfigService: ConfigType<typeof jwtAccessConfig>,
	) {
		const secret = jwtConfigService.secret

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
