import { Module } from "@nestjs/common"
import { AuthController } from "../../adapters/api/controller/auth/auth.controller"
import { ServiceModule } from "../service/logic-service.module"
import { LocalStrategy } from "src/adapters/spi/auth/strategies/local/local.strategy"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from "src/application/services/auth/auth.service"
import { DatabaseModule } from "../db/database.module"
import { DtoModule } from "../dto/dto.module"
import { JwtModule } from "@nestjs/jwt"
import jwtConfig from "src/application/services/jwt/config/jwt.access.config"
import { SignUpCase } from "src/use_case/auth/sign.up.case"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { ConfigModule } from "@nestjs/config"
import { JwtAccessStrategy } from "src/adapters/spi/auth/strategies/jwt/access/jwt.access.strategy"
import { GetAccountCase } from "src/use_case/auth/get.account.case"
import refreshJwtConfig from "src/application/services/jwt/config/jwt.refresh.config"
import accessJwtConfig from "src/application/services/jwt/config/jwt.access.config"
import { RefreshCase } from "src/use_case/auth/refresh.case/refresh.case"
import { JwtRefreshStrategy } from "src/adapters/spi/auth/strategies/jwt/refresh/jwt.refresh.strategy"

SignInCase
@Module({
	imports: [
		ServiceModule,
		PassportModule,
		DatabaseModule,
		DtoModule,
		JwtModule.registerAsync(accessJwtConfig.asProvider()),
		JwtModule.registerAsync(refreshJwtConfig.asProvider()),
		ConfigModule.forFeature(accessJwtConfig),
		ConfigModule.forFeature(refreshJwtConfig),
	],
	controllers: [AuthController],
	providers: [
    RefreshCase,
		LocalStrategy,
		AuthService,
		SignUpCase,
		SignInCase,
		JwtAccessStrategy,
    JwtRefreshStrategy,
		GetAccountCase,
	],
})
export class AuthModule {}
