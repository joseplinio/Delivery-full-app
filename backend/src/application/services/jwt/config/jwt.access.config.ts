import { registerAs } from "@nestjs/config"
import { JwtModuleOptions } from "@nestjs/jwt"

export default registerAs(
	"access_token",
	(): JwtModuleOptions => ({
		secret: process.env.ACCESS_JWT_SECRET,
		signOptions: {
			expiresIn: process.env.ACCESS_JWT_EXPIRE_IN as any,
		},
	}),
)
