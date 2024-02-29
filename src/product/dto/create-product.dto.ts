import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
  @IsNotEmpty()
  @ApiProperty({ default: 2 })
  categoryId: number;

  @IsNotEmpty()
  @ApiProperty({ description: '판매자 생성시 받았던 id 입력' })
  sellerId: number;

  @IsNotEmpty()
  @ApiProperty({ default: '상품명1' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ default: '상세정보1' })
  detail: string;

  @IsNotEmpty()
  @ApiProperty({ default: 'https://plus.unsplash.com/premium_photo-1675896084254-dcb626387e1e?q=80&w=2135&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' })
  thumbnail: string;

  @IsNotEmpty()
  @ApiProperty({ default: 30000 })
  price: number;

  @ApiProperty({ default: 100 })
  stock: number;
}
