import { Module } from '@nestjs/common';
import { FeeService } from './fee.service';
import { FeeController } from './fee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee } from './fee.entity';
import { Seller } from '../seller/seller.entity';
import { Order } from '../order/order.entity';
import { UserPermission } from '../user-permission/user-permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fee, Seller, Order, UserPermission])],
  providers: [FeeService],
  controllers: [FeeController],
  exports: [FeeService],
})
export class FeeModule {}
