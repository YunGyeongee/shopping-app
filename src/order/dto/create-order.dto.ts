import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  productId: number;

  @IsNotEmpty()
  @ApiProperty({ default: 1 })
  amount: number;
}
