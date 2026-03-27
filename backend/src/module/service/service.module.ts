import { Module } from "@nestjs/common"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"
import { HashService } from "src/application/services/hash/hash.service"
import { PrismaService } from "src/application/services/prisma/prisma.service"

@Module({
	exports: [HashService, PrismaService, DtoValidatorService],
	providers: [HashService, PrismaService, DtoValidatorService],
})
export class ServiceModule {}
