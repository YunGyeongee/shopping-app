import { IsNotEmpty } from 'class-validator';

export class CreateSellerDto {
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
