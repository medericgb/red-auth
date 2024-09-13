import {
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { PassportJwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth-v2')
export class PassportAuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(PassportLocalGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.signIn(request.user);
  }

  @Get('me')
  @UseGuards(PassportJwtAuthGuard)
  async getUserInfo(@Request() request) {
    return request.user;
  }
}
