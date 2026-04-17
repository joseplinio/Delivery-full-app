import { Injectable } from "@nestjs/common"
import { Prisma } from "@prisma/client"
import { SignUpDto } from "src/application/interfaces/dto/sign.up.dto"
import { UserEntity } from "src/entities/user/user.entity"

@Injectable()
export class UserMapper {
  async upDtoToDomain(body: SignUpDto): Promise<UserEntity> {
    try {
      const user: UserEntity = {
        id: body.id,
        name: body.name,
        email: body.email,
        password: body.password,
      }
      return user
    } catch (err) {
      throw new Error(err)
    }
  }

  async cleanUser(body: UserEntity): Promise<Object> {
    try {
      const cleanUser: object = {
        name: body.name,
        email: body.email,
      }
      return cleanUser
    } catch (err) {
      throw new Error(err)
    }
  }
}
