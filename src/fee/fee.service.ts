import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository } from 'typeorm';
import { Fee } from './fee.entity';
import { Seller } from '../seller/seller.entity';
import { Order } from '../order/order.entity';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(userId: number) {
    const sellers = await this.sellerRepository.find({
      where: { userId },
    });

    const sellerIds = sellers.map((seller) => seller.id);
    return await this.feeRepository.find({
      where: { sellerId: In(sellerIds) },
    });
  }
  async findBySellerId(userId: number, sellerId: number) {
    const seller = await this.sellerRepository.findOne({
      where: { id: sellerId },
    });

    if (userId !== seller.userId) {
      throw new UnauthorizedException('상품 조회 권한이 없습니다.');
    }

    return this.feeRepository.find({ where: { sellerId } });
  }
  async create() {
    // todo - 시간포맷 수정
    const today = new Date(this.getTodayDate());
    const aweek = new Date(this.getAweekDate());

    const orders = await this.orderRepository.find({
      where: {
        state: 'done',
        createdAt: Between(aweek, today),
      },
    });

    const sellerIds = [
      ...new Set(
        orders.map((order) => {
          return order.sellerId;
        }),
      ),
    ].sort();

    const result = [];
    // todo - 코드 리팩토링 필요 -> 성능저하의 문제
    sellerIds.forEach((sellerId) => {
      let total = 0;
      orders.forEach((order) => {
        if (sellerId === order.sellerId) {
          total += order.payment;
        }
      });

      result.push({ sellerId: sellerId, fee: total * 0.95 });
    });

    let count = 0;
    result.forEach((item) => {
      const fee = this.feeRepository.create({
        sellerId: item.sellerId,
        calculatedDate: today,
        calculatedFee: item.fee,
      });

      try {
        this.feeRepository.save(fee);
        count++;
      } catch (err) {
        console.log(err);
      }
    });

    return `수수료 정산 ${count} 건의 데이터가 생성되었습니다.`;
  }
  getTodayDate() {
    const today = new Date();

    return new Date(
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} 08:59:59`,
    );
  }
  getAweekDate() {
    const TIME_ZONE = 9 * 60 * 60 * 1000;
    const today = new Date();

    return new Date(new Date().setDate(today.getDate() - 7) + TIME_ZONE)
      .toISOString()
      .split('T')[0];
  }
}
