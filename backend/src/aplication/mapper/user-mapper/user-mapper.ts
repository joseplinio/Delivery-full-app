import { Injectable } from "@nestjs/common"
import { SignUpDto } from "src/aplication/interfaces/dto/sign.up.dto"
import { UserEntity } from "src/entities/user.entity"

@Injectable()
export class UserMapper {
	async toEntity(body: SignUpDto): Promise<UserEntity> {
		try {
			const user: UserEntity = {
				name: body.name,
				email: body.email,
				passWord: body.password,
			}
			return user
		} catch (err) {
			throw new Error("UserMapper error, pls fix it")
		}
	}
}
