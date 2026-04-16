import { Test, TestingModule } from "@nestjs/testing"
import { UpdateUserCase } from "./update.user.case"

describe("UserUpdateCase", () => {
	let provider: UpdateUserCase

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UpdateUserCase],
		}).compile()

		provider = module.get<UpdateUserCase>(UpdateUserCase)
	})

	it("should be defined", () => {
		expect(provider).toBeDefined()
	})
})
