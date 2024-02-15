import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  sellerId: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  detail: string;

  @IsNotEmpty()
  thumbnail: string;

  @IsNotEmpty()
  price: number;

  stock: number;
}
