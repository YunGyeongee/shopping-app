import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDto {
  @IsNumber()
  @ApiProperty({ default: 2 })
  categoryId: number;

  @IsString()
  @ApiProperty({ default: '상품명 수정1' })
  name: string;

  @IsString()
  @ApiProperty({ default: '상세정보 수정1' })
  detail: string;

  @IsString()
  @ApiProperty({ default: 'none' })
  thumbnail: string;

  @IsNumber()
  @ApiProperty({ default: '10000' })
  price: number;

  @IsNumber()
  @ApiProperty({ default: '20' })
  stock: number;
}
