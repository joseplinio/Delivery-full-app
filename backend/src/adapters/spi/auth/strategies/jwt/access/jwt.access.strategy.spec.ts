import { Test, TestingModule } from "@nestjs/testing"
import { JwtAccessStrategy } from "./jwt.access.strategy"

describe("JwtStrategy", () => {
	let provider: JwtAccessStrategy

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [JwtAccessStrategy],
		}).compile()

		provider = module.get<JwtAccessStrategy>(JwtAccessStrategy)
	})

	it("should be defined", () => {
		expect(provider).toBeDefined()
	})
})
