import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Seller } from '../seller/seller.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async create(userId: number, data: CreateProductDto) {
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
}
