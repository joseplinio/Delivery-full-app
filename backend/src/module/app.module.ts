import { Module } from "@nestjs/common"
import { DatabaseModule } from "./db/database.module"
import { DtoModule } from "./dto/dto.module"
import { UserModule } from "./user/user.module"
import { AuthModule } from "./auth/auth.module"
import { ServiceModule } from "./service/logic-service.module"

@Module({
  imports: [AuthModule, DatabaseModule, DtoModule, UserModule, ServiceModule],
})
export class AppModule { }
