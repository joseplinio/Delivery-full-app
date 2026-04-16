import { Module } from "@nestjs/common"
import { UserMapper } from "src/application/mapper/user/user.mapper"
import { HashService } from "src/application/services/hash/hash.service"

@Module({
  exports: [HashService, UserMapper],
  providers: [HashService, UserMapper],
})
export class ServiceModule { }
