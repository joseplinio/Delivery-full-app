import { Controller, Post, Body, Req, UseGuards, Get } from "@nestjs/common"
import { JwtAuthGuard } from "src/adapters/spi/auth/guards/jwt/jwt.guard"
import { LocalAuthGuard } from "src/adapters/spi/auth/guards/local-auth/local.auth.guard"
import { SignInDto } from "src/application/interfaces/dto/sign.in.dto"
import { SignUpDto } from "src/application/interfaces/dto/sign.up.dto"
import { DtoValidatorService } from "src/application/services/dto/dto.validator.service"
import { GetAccountCase } from "src/use_case/auth/get.account.case"
import { SignInCase } from "src/use_case/auth/sign.in.case"
import { SignUpCase } from "src/use_case/auth/sign.up.case"

@Controller("auth")
export class AuthController {
  constructor(
    private readonly signUpCase: SignUpCase,
    private readonly signInCase: SignInCase,
    private readonly getAccount: GetAccountCase,
    private readonly dtoValidatior: DtoValidatorService,
  ) { }

  @Post("sign-up")
  async signUp(@Body() signUpBody: SignUpDto) {
    try {
      const signUpDto = await this.dtoValidatior.valideDto<SignUpDto>(
        SignUpDto,
        signUpBody,
      )
      const signUpResult = await this.signUpCase.handler(signUpDto)

      return signUpResult
    } catch (err) {
      throw err
    }
  }

  @Post("sign-in")
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() signInBody: SignInDto) {
    try {
      const signInDto = await this.dtoValidatior.valideDto<SignInDto>(
        SignInDto,
        signInBody,
      )
      const singInResult = await this.signInCase.handler(signInDto)
      return singInResult
    } catch (err) {
      throw err
    }
  }

  @Post("sign-out")
  @UseGuards(LocalAuthGuard)
  async signOut(@Req() request) {
    try {
      // const signInDto = await this.dtoValidatior.valideDto<SignInDto>(
      //   SignInDto,
      //   signInBody,
      // )
      //
      // const signInResult = await this.signInCase.handler(signInDto)
      //
      // return signInResult

  @Get("account")
  @UseGuards(JwtAuthGuard)
  async account(@Req() req: any) {
    try {
      const getAccountResult = await this.getAccount.handler(req.user.userId)
      return getAccountResult
    } catch (err) {
      throw err
    }
  }
}
