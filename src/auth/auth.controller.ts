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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '로그인' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          description: 'email',
          default: 'user01@gmail.com',
        },
        password: {
          type: 'string',
          description: '비밀번호',
          default: 'user01',
        },
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
  @Get('google/login')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: '소셜(구글) 로그인 요청' })
  async googleLogin(@Request() req) {
    console.log('GET google login');
  }
  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({
    summary: '소셜(구글) 로그인',
    description: '기존에 생성된 이메일이 없다면 회원등록',
  })
  async googleCallback(@Request() req, @Response() res) {
    const token = await this.authService.googleLogin(req);
    res.cookie('access_token', token.accessToken, { httpOnly: true });
    res.redirect('/');
  }
}
