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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '상품 생성', description: 'sellerID 에는 seller 생성시 결과값의 id 입력' })
  async create(
    @Request() req,
    @Body(new ValidationPipe()) data: CreateProductDto,
  ) {
    const userId = req.user.id;

    return this.productService.create(userId, data);
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '상품 수정' })
  async update(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateProductDto,
  ) {
    const userId = req.user.id;

    return this.productService.update(userId, id, data);
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '상품 조회' })
  async findByProduct(@Request() req, @Param('productId', ParseIntPipe) productId: number) {
    const userId = req.user.id;

    return this.productService.findByProduct(userId, productId);
  }
  @Get('sellerId=:sellerId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '모든 상품 조회(판매자별)' })
  async findBySeller(@Request() req, @Param('sellerId', ParseIntPipe) sellerId: number) {
    const userId = req.user.id;

    return this.productService.findBySeller(userId, sellerId);
  }
  @Put(':id/delete')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '상품 삭제' })
  async delete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;

    return this.productService.delete(userId, id);
  }
}
