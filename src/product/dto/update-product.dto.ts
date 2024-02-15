import { IsNumber, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  name: string;

  @IsString()
  detail: string;

  @IsString()
  thumbnail: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}
