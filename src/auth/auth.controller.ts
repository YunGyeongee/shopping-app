import {
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GoogleOAuthGuard } from './google-oauth.guard';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UseGuards(JwtAuthGuard)
  login(@Request() req) {
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
