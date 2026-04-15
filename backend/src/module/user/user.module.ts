import { Module } from "@nestjs/common"
import { UserController } from "src/adapters/api/controller/user/user.controller"
import { DtoModule } from "../dto/dto.module"
import { UpdateUserCase } from "src/use_case/user/user.update.case/update.user.case"
import { UserMapper } from "src/application/mapper/user/user.mapper"
import { DatabaseModule } from "../db/database.module"

@Module({
  imports: [DtoModule, DatabaseModule],
  providers: [UpdateUserCase, UserMapper],
  controllers: [UserController],
})
export class UserModule { }
