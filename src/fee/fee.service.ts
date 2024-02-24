import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Fee } from './fee.entity';
import { Seller } from '../seller/seller.entity';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private readonly feeRepository: Repository<Fee>,
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async findAll(userId: number) {
    // todo - 관리자 권한의 경우 전체 조회
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
}
