import { IsNotEmpty } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  licenseNumber: string;

  @IsNotEmpty()
  bankName: string;

  @IsNotEmpty()
  accountNumber: string;

  @IsNotEmpty()
  zip: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  addressDetail: string;
}
