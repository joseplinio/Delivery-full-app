import { Injectable } from "@nestjs/common"
import { IUserRepository } from "src/application/interfaces/repositories/I.user.repository"
import { PrismaService } from "src/application/services/prisma/prisma.service"
import { UserEntity } from "src/entities/user.entity"

@Injectable()
export class UserRepository implements IUserRepository<UserEntity, UserEntity> {
  constructor(private prisma: PrismaService) { }

  async create(body: UserEntity): Promise<UserEntity | null> {
    try {
      const createResult = await this.prisma.user.create({ body })
      return createResult
    } catch (err) {
      console.log(err)
      throw new Error("some error")
    }
  }

  async findAll(): Promise<[UserEntity] | null> {
    try {
      const findAllResult = await this.prisma.post.findAll()
      return findAllResult
    } catch (err) {
      console.log(err)
      throw new Error("somthing")
    }
  }

  async findOne(id: string): Promise<UserEntity | null> {
    try {
      const findOneResult = await this.prisma.post.findOne({ where: id })
      return findOneResult
    } catch (err) {
      console.log(err)
      throw new Error("somthing")
    }
  }

  async update(id: string, data: object): Promise<UserEntity> {
    try {
      const updateResult = await this.prisma.post.update({ data, id })
      return updateResult
    } catch (err) {
      console.log(err)
      throw new Error("somthing")
    }
  }
  async remove(id: number): Promise<void> {
    try {
      const removeResult = await this.prisma.post.delete({ id })
      return removeResult
    } catch (err) {
      console.log(err)
      throw new Error("somthing")
    }
  }
}
