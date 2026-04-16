import { Injectable } from "@nestjs/common"
import { IUserRepository } from "src/application/interfaces/repositories/I.user.repository"
import { PrismaService } from "src/application/services/prisma/prisma.service"
import { UserEntity } from "src/entities/user/user.entity"

@Injectable()
export class UserRepository implements IUserRepository<UserEntity, UserEntity> {
	constructor(private prisma: PrismaService) {}

	async create(body: UserEntity): Promise<void> {
		try {
			await this.prisma.user.create({ data: { ...body } })
		} catch (err) {
			throw err
		}
	}

	async findAll(): Promise<UserEntity[] | null> {
		try {
			const findAllResult = await this.prisma.user.findMany()
			return findAllResult
		} catch (err) {
			throw err
		}
	}

	async findById(id: string): Promise<UserEntity | null> {
		try {
			const findByIdResult = await this.prisma.user.findUnique({
				where: { id: id },
			})
			return findByIdResult
		} catch (err) {
			throw err
		}
	}

	async findByEmail(email: string): Promise<UserEntity | null> {
		try {
			const findByEmailResult = await this.prisma.user.findUnique({
				where: { email: email },
			})
			return findByEmailResult
		} catch (err) {
			throw err
		}
	}
	async update(id: string, data: object): Promise<UserEntity> {
		try {
			const updateResult = await this.prisma.user.update({
				where: { id },
				data: { ...data },
			})
			return updateResult
		} catch (err) {
			throw err
		}
	}

	async remove(id: string): Promise<void> {
		try {
			await this.prisma.user.delete({ where: { id } })
		} catch (err) {
			throw err
		}
	}
}
