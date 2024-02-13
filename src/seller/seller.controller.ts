import {
  Request,
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
  Put,
  Param,
} from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { SellerService } from './seller.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body(new ValidationPipe()) data: CreateSellerDto,
  ) {
    const userId = req.user.id;

    return this.sellerService.create(userId, data);
  }

  @Put('delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param('licenseNumber') licenseNumber: string) {
    const userId = req.user.id;

    return this.sellerService.delete(userId, licenseNumber);
  }
}
