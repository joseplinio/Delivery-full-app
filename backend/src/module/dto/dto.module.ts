import { Module } from "@nestjs/common"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"

@Module({
  exports: [DtoValidatorService],
  providers: [DtoValidatorService],
})
export class DtoModule { }
