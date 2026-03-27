import { Injectable } from "@nestjs/common"
import { compare, hash } from "bcryptjs"

@Injectable()
export class HashService {
	async hash(password: string): Promise<string> {
		try {
			const hashedPassword = hash(password, 10)
			return hashedPassword
		} catch (err) {
			throw new Error(err)
		}
	}

	async compareHash(password: string, hash: string): Promise<boolean> {
		try {
			const comparedHash = await compare(password, hash)
      return comparedHash
		} catch (err) {
			throw err
		}
	}
}
