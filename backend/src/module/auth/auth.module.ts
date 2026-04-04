import { Module } from "@nestjs/common"
import { AuthController } from "../../adapters/api/controller/auth/auth.controller"
import { CaseModule } from "../case/case.module"
import { ServiceModule } from "../service/logic-service.module"
import { LocalStrategy } from "src/adapters/spi/auth/strategies/local.strategy"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from "src/application/services/auth/auth.service"
import { DatabaseModule } from "../db/database.module"
import { DtoModule } from "../dto/dto.module"
import { JwtModule } from "@nestjs/jwt"
import jwtConfig from "src/application/services/jwt/config/jwt.config"

@Module({
  imports: [
    CaseModule,
    ServiceModule,
    PassportModule,
    DatabaseModule,
    DtoModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService],
})
export class AuthModule { }
