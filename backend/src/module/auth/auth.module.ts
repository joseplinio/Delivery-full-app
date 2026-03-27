import { Module } from "@nestjs/common"
import { AuthController } from "../../adapters/api/controller/auth/auth.controller"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { CaseModule } from "../case/case.module"
import { DatabaseModule } from "../db/database.module"
import { ServiceModule } from "../service/service.module"

@Module({
  imports: [CaseModule, DatabaseModule, ServiceModule],
  controllers: [AuthController],
})
export class AuthModule { }
