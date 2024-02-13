import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sellers } from './sellers.entity';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Sellers)
    private readonly sellersRepository: Repository<Sellers>,
  ) {}

  async findOneByLicenseNumber(licenseNumber: string) {
    const seller = this.sellersRepository.findOne({
      where: { licenseNumber: licenseNumber },
    });

    if (seller) {
      throw new BadRequestException('이미 등록된 사업자번호 입니다.');
    }

    return seller;
  }
  async create(userId: number, data: CreateSellerDto) {
    await this.findOneByLicenseNumber(data.licenseNumber);

    // todo - 사업자번호 유효성 체크 -> api 검증으로 변경하기
    const licenseLengthCheck = data.licenseNumber.length;

    if (licenseLengthCheck !== 10) {
      throw new BadRequestException('사업자번호가 유효하지 않습니다.');
    }

    return this.sellersRepository.save({
      userId: userId,
      name: data.name,
      licenseNumber: data.licenseNumber,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
      zip: data.zip,
      address: data.address,
      addressDetail: data.addressDetail,
    });
  }
  async findOneSeller(licenseNumber: string) {
    return this.sellersRepository.findOne({
      where: { licenseNumber: licenseNumber },
    });
  }
  async delete(userId: number, licenseNumber: string) {
    const seller = await this.findOneSeller(licenseNumber);

    if (!seller) {
      throw new BadRequestException('사업자를 찾을 수 없습니다.');
    }

    if (userId !== seller.userId) {
      throw new UnauthorizedException('회원정보가 다릅니다.');
    }

    return this.sellersRepository.softDelete({ id: seller.id });
  }
}