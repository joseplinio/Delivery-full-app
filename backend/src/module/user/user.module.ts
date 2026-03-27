import { Module } from "@nestjs/common"
import { CaseModule } from "../case/case.module"
import { UserController } from "src/adapters/api/controller/user/user.controller"
import { DtoModule } from "../dto/dto.module"

@Module({
	imports: [CaseModule, DtoModule],
	controllers: [UserController],
})
export class UserModule {}
