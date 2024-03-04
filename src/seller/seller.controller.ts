import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Put,
  Get,
} from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SellerService } from './seller.service';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('seller')
@ApiTags('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '판매자 생성' })
  async create(
    @Request() req,
    @Body(new ValidationPipe()) data: CreateSellerDto,
  ) {
    const userId = req.user.id;

    await this.sellerService.checkLicense(data.licenseNumber);
    return this.sellerService.create(userId, data);
  }
  @Put('delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '판매자 삭제' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        licenseNumber: {
          type: 'string',
          description: '사업자번호(숫자만)',
          default: '2208162517',
        },
      },
    },
  })
  async delete(@Request() req, @Body(new ValidationPipe()) data) {
    const userId = req.user.id;

    return this.sellerService.delete(userId, data.licenseNumber);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '판매자 조회' })
  async findSellerByUser(@Request() req) {
    const userId = req.user.id;

    return this.sellerService.findSellerByUser(userId);
  }
}
