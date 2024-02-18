import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Product } from '../product/product.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(userId: number, data: CreateOrderDto) {
    const product = await this.productRepository.findOne({
      where: { id: data.productId },
    });

    if (!product) {
      throw new BadRequestException('상품을 찾을 수 없습니다.');
    }

    // 재고 확인
    if (product.stock < data.amount) {
      throw new BadRequestException('주문 수량이 상품 재고의 수보다 큽니다.');
    }

    const order = this.orderRepository.save({
      userId: userId,
      productId: data.productId,
      amount: data.amount,
      state: 'order',
    });

    // 재고 재계산
    const cal = product.stock - data.amount;
    await this.productRepository.update(data.productId, { stock: cal });

    return order;
  }
}
