import {
  Request,
  Controller,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { FeeService } from './fee.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('fee')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Request() req) {
    const userId = req.user.id;

    return this.feeService.findAll(userId);
  }

  @Get(':sellerId')
  @UseGuards(JwtAuthGuard)
  async findBySellerId(
    @Request() req,
    @Param('sellerId', ParseIntPipe) sellerId: number,
  ) {
    const userId = req.user.id;

    return this.feeService.findBySellerId(userId, sellerId);
  }
}
