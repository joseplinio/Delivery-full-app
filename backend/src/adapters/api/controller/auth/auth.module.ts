import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { SignUpCase } from "src/use_case/auth/sign.in.case"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"

@Module({
	controllers: [AuthController],
	providers: [SignUpCase, SignUpCase, UserRepository],
})
export class AuthModule {}
