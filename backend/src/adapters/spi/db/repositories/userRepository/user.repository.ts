import { Injectable } from "@nestjs/common"
import { IUserRepository } from "src/aplication/interfaces/repositories/I.user.repository"
import { UserEntity } from "src/entities/user.entity"

@Injectable()
export class UserRepository implements IUserRepository<UserEntity, any> {
  async create(body: UserEntity): Promise<any> { }

  async findAll(): Promise<any> { }

  async findOne(id: string): Promise<any> { }

  async update(id: string): Promise<any> { }

  async remove(id: number): Promise<any> { }
}
