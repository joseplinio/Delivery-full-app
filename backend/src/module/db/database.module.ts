import { Module } from "@nestjs/common"
import { UserRepository } from "src/adapters/spi/db/repositories/userRepository/user.repository"
import { ServiceModule } from "../service/logic-service.module"
import { PrismaService } from "src/application/services/prisma/prisma.service"

@Module({
	imports: [ServiceModule],
	exports: [UserRepository],
	providers: [UserRepository, PrismaService],
})
export class DatabaseModule {}
