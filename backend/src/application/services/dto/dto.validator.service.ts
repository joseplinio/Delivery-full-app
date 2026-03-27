import { Injectable } from "@nestjs/common"
import { IValideDto } from "src/application/interfaces/dto/i.valide.dto"
import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"

@Injectable()
export class DtoValidatorService implements IValideDto<any, unknown> {
  async valideDto<T>(dtoClass: new () => T, data: any): Promise<T> {
    try {
      const instance = plainToInstance(dtoClass as any, data)
      const errors = await validate(instance)

      if (errors.length > 0) {
        for (const error of errors) {
          if (error.constraints) {
            console.log(
              `Valitadation Error: ------------  FIX IT ------------ \n\n${error.constraints}`,
            )
          }
        }

        console.log(`\n${JSON.stringify(errors)}`)
        throw new Error("Dados invalidos recibidos!")
      }

      return instance as T // NOTE: it looks kind of Leon and Nilce for me
    } catch (err) {
      throw new Error(String(err))
    }
  }
}
