import { Module } from "@nestjs/common"
import { AuthController } from "../../adapters/api/controller/auth/auth.controller"
import { ServiceModule } from "../service/logic-service.module"
import { LocalStrategy } from "src/adapters/spi/auth/strategies/local/local.strategy"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from "src/application/services/auth/auth.service"
import { DatabaseModule } from "../db/database.module"
import { DtoModule } from "../dto/dto.module"
import { JwtModule } from "@nestjs/jwt"
import jwtConfig from "src/application/services/jwt/config/jwt.config"
import { SignUpCase } from "src/use_case/auth/sign.up.case"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { ConfigModule } from "@nestjs/config"
import { JwtStrategy } from "src/adapters/spi/auth/strategies/jwt/jwt.strategy"
import { GetAccountCase } from "src/use_case/auth/get.account.case"

SignInCase
@Module({
  imports: [
    ServiceModule,
    PassportModule,
    DatabaseModule,
    DtoModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    AuthService,
    SignUpCase,
    SignInCase,
    JwtStrategy,
    GetAccountCase,
  ],
})
export class AuthModule { }
