import { Module } from "@nestjs/common"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { SignUpCase } from "src/use_case/auth/sign.up.case"
import { UpdateUserCase } from "src/use_case/user/user.update.case/update.user.case"
import { DatabaseModule } from "../db/database.module"
import { UserMapper } from "src/application/mapper/user/user.mapper"
import { ServiceModule } from "../service/logic-service.module"

@Module({
	imports: [DatabaseModule, ServiceModule],
	exports: [SignUpCase, SignInCase, UpdateUserCase],
	providers: [SignUpCase, SignInCase, UpdateUserCase, UserMapper],
})
export class CaseModule {}
