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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body(new ValidationPipe()) data: CreateOrderDto,
  ) {
    const userId = req.user.id;

    return this.orderService.create(userId, data);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const userId = req.user.id;

    return this.orderService.findAll(userId);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req, @Param('id', ParseIntPipe) orderId: number) {
    const userId = req.user.id;

    return this.orderService.findOne(userId, orderId);
  }
  @Put(':id/cancel')
  @UseGuards(JwtAuthGuard)
  async cancel(@Request() req, @Param('id', ParseIntPipe) orderId: number) {
    const userId = req.user.id;

    return this.orderService.cancel(userId, orderId);
  }
  @Put(':id/return')
  @UseGuards(JwtAuthGuard)
  async return(@Request() req, @Param('id', ParseIntPipe) orderId: number) {
    const userId = req.user.id;

    return this.orderService.refund(userId, orderId);
  }
}
