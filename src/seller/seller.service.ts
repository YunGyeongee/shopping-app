import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './seller.entity';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto';
import axios from 'axios';
import * as process from 'process';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private readonly sellerRepository: Repository<Seller>,
  ) {}

  async checkLicense(licenseNumber: string) {
    const serviceKey = process.env.SERVICE_KEY;
    const data = {
      b_no: [licenseNumber],
    };

    const res = await axios
      .post(
        `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`,
        data,
        { responseType: 'json' },
      )
      .then((res) => {
        return res.data;
      });

    if (res.data[0].b_stt_cd !== '01') {
      throw new BadRequestException(
        '유효한 사업자번호가 아닙니다. (휴면, 폐업 포함)',
      );
    }
  }
  async create(userId: number, data: CreateSellerDto) {
    const seller = this.sellerRepository.create({
      userId: userId,
      name: data.name,
      licenseNumber: data.licenseNumber,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      zip: data.zip,
      address: data.address,
      addressDetail: data.addressDetail,
    });

    try {
      await this.sellerRepository.save(seller);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('이미 등록된 사업자번호 입니다.');
      } else {
        throw new InternalServerErrorException(err);
      }
    }
    return seller;
  }
  async delete(userId: number, licenseNumber: string) {
    const seller = await this.sellerRepository.findOne({
      where: { licenseNumber },
    });

    if (!seller) {
      throw new BadRequestException('사업자를 찾을 수 없습니다.');
    }

    if (userId !== seller.userId) {
      throw new UnauthorizedException('회원정보가 다릅니다.');
    }

    return this.sellerRepository.softDelete({ id: seller.id });
  }
  async findSellerByUser(userId: number) {
    return await this.sellerRepository.find({
      where: { userId },
    });
  }
}
