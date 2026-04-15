import type { ConfigType } from "@nestjs/config"
import type { TyJwtPayload } from "src/application/types/auth.jwt.payload"
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import jwtConfig from "src/application/services/jwt/config/jwt.config"
import { Inject, Injectable } from "@nestjs/common"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigService: ConfigType<typeof jwtConfig>,
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
