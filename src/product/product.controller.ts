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
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Request() req,
    @Body(new ValidationPipe()) data: CreateProductDto,
  ) {
    const userId = req.user.id;

    return this.productService.create(userId, data);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateProductDto,
  ) {
    const userId = req.user.id;

    return this.productService.update(userId, id, data);
  }
  @Get('sellerId=:sellerId')
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Request() req,
    @Param('sellerId', ParseIntPipe) sellerId: number,
  ) {
    const userId = req.user.id;

    return this.productService.findAll(userId, sellerId);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    return this.productService.findOne(userId, id);
  }
  @Put(':id/delete')
  @UseGuards(JwtAuthGuard)
  async delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    return this.productService.delete(userId, id);
  }
}
