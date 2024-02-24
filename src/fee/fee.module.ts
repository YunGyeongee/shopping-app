import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee } from './fee.entity';
import { Seller } from '../seller/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Seller])],
  providers: [FeeService],
  controllers: [FeeController],
  exports: [FeeService],
})
export class FeeModule {}
