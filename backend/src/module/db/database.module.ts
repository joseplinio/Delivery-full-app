import { Module } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { ServiceModule } from "../service/service.module"

@Module({
	imports: [ServiceModule],
	exports: [UserRepository],
	providers: [UserRepository],
})
export class DatabaseModule {}
