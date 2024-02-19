import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(
    @Body()
    body: CreateUserDto,
  ) {
    return await this.authService.signup(body);
  }

  @Post('login')
  async login(
    @Body()
    body: CreateUserDto,
    @Req()
    req: Request,
    @Res()
    res: Response,
  ) {
    return await this.authService.login(body, req, res);
  }

  @Get()
  async logOut(
    @Body()
    @Req()
    req: Request,
    @Res()
    res: Response,
  ) {
    await this.authService.logOut(req, res);
  }
}
