import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(4)
  @IsNotEmpty()
  password: string;

  @IsPhoneNumber('KR')
  @IsNotEmpty()
  phone: string;
}