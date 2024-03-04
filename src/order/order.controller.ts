import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Put,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '전체 주문 조회' })
  async findAll(@Request() req) {
    const userId = req.user.id;

    return this.orderService.findAll(userId);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '주문 조회' })
  async findOne(@Request() req, @Param('id', ParseIntPipe) orderId: number) {
    const userId = req.user.id;

    return this.orderService.findOne(userId, orderId);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '주문 생성' })
  async create(
    @Request() req,
    @Body(new ValidationPipe()) data: CreateOrderDto,
  ) {
    const userId = req.user.id;

    return this.orderService.create(userId, data);
  }
  @Put(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '주문 취소' })
  async cancel(@Request() req, @Param('id', ParseIntPipe) orderId: number) {
    const userId = req.user.id;

    return this.orderService.cancel(userId, orderId);
  }
  @Put(':id/return')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '주문 환불(반품)' })
  async return(@Request() req, @Param('id', ParseIntPipe) orderId: number) {
    const userId = req.user.id;

    return this.orderService.refund(userId, orderId);
  }
}
