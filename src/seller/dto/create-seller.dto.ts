import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSellerDto {
  @IsNotEmpty()
  @ApiProperty({ description: '판매자(사업자명)', default: '매일매일 두두두' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '사업자번호(숫자만 입력)',
    default: '2208162517',
  })
  licenseNumber: string;

  @IsNotEmpty()
  @ApiProperty({ default: '신한' })
  bankName: string;

  @IsNotEmpty()
  @ApiProperty({ default: '11024622234611' })
  accountNumber: string;

  @IsNotEmpty()
  @ApiProperty({ description: '우편번호' })
  zip: string;

  @IsNotEmpty()
  @ApiProperty({ description: '주소' })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ description: '상세 주소' })
  addressDetail: string;
}
