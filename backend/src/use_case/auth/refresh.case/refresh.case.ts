import { Injectable } from "@nestjs/common"
import { IUseCase } from "src/application/interfaces/use_case/use.case"
import { AuthService } from "src/application/services/auth/auth.service"

@Injectable()
export class RefreshCase implements IUseCase<string, object> {
	constructor(private readonly authService: AuthService) {}
	async handler(userId: string): Promise<object> {
		return await this.authService.refresToken(userId)
	}
}
