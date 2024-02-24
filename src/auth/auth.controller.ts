import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  async googleLogin(@Request() req) {
    console.log('GET google login');
  }
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async googleCallback(@Request() req, @Response() res) {
    const token = await this.authService.googleLogin(req);
    res.cookie('access_token', token.accessToken, { httpOnly: true });
    res.redirect('/');
  }
}
