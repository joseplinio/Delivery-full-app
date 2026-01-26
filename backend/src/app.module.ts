import { Module } from "@nestjs/common"
import { AuthModule } from "./adapters/api/controller/auth/auth.module"
import { UserMapper } from './mapper/user-mapper/user-mapper';
import { UserMapper } from './src/aplication/mapper/user-mapper/user-mapper';
import { UserMapper } from './aplication/mapper/user-mapper/user-mapper';

@Module({
	imports: [AuthModule],
	controllers: [],
	providers: [UserMapper],
})
export class AppModule {}
