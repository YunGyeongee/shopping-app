import {
  Request,
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { FeeService } from './fee.service';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/security/roles.guard';
import { Roles } from '../auth/decorator/role.decorator';

@Controller('fee')
@ApiTags('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '모든 수수료 정산 조회(유저별)' })
  async findAll(@Request() req) {
    const userId = req.user.id;

    return this.feeService.findAll(userId);
  }
  @Get(':sellerId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '모든 수수료 정산 조회(판매자별)' })
  async findBySellerId(
    @Request() req,
    @Param('sellerId', ParseIntPipe) sellerId: number,
  ) {
    const userId = req.user.id;

    return this.feeService.findBySellerId(userId, sellerId);
  }
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '수수료 정산 생성' })
  async create() {
    return this.feeService.create();
  }
}
