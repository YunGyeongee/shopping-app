import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Seller } from '../seller/seller.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async create(userId: number, data: CreateProductDto) {
    const seller = await this.sellerRepository.findOne({
      where: {
        userId: userId,
        id: data.sellerId,
      },
    });

    if (!seller) {
      throw new NotFoundException('판매자 정보를 찾을 수 없습니다.');
    }

    return this.productRepository.save({
      categoryId: data.categoryId,
      sellerId: data.sellerId,
      name: data.name,
      detail: data.detail,
      thumbnail: data.thumbnail,
      price: data.price,
      stock: data.stock,
    });
  }
  async update(userId: number, id: number, data: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });
    const seller = await this.sellerRepository.findOne({
      where: { id: product.sellerId },
    });

    if (userId !== seller.userId) {
      throw new UnauthorizedException('상품 수정 권한이 없습니다.');
    }

    return this.productRepository.update(id, {
      categoryId: data.categoryId,
      name: data.name,
      detail: data.detail,
      thumbnail: data.thumbnail,
      price: data.price,
      stock: data.stock,
    });
  }
  async findAll(userId: number, sellerId: number) {
    console.log('sellerId');
    console.log(sellerId);
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
    });

    if (userId !== seller.userId) {
      throw new UnauthorizedException('상품 조회 권한이 없습니다.');
    }

    return this.productRepository.find({
      where: { sellerId: seller.id },
    });
  }
  async findOne(userId: number, id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    const seller = await this.sellerRepository.findOne({
      where: { id: product.sellerId },
    });

    if (userId !== seller.userId) {
      throw new UnauthorizedException('상품 조회 권한이 없습니다.');
    }

    return this.productRepository.find({ where: { id } });
  }
  async delete(userId: number, id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new BadRequestException('상품을 찾을 수 없습니다.');
    }

    const seller = await this.sellerRepository.findOne({
      where: { id: product.sellerId },
    });

    if (userId !== seller.userId) {
      throw new UnauthorizedException('상품 삭제 권한이 없습니다.');
    }

    return this.productRepository.softDelete(id);
  }
}
