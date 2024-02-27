import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ default: 'user000' })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ default: 'user001@gmail.com' })
  email: string;

  @MinLength(4)
  @IsNotEmpty()
  @ApiProperty({ default: 'user01' })
  password: string;

  @IsPhoneNumber('KR')
  @IsNotEmpty()
  @ApiProperty({ default: '01012341234' })
  phone: string;
}
