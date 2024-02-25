import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { FeeService } from '../fee/fee.service';

@Injectable()
export class CalculateFeeService {
  constructor(private readonly feeService: FeeService) {}

  private readonly logger = new Logger(CalculateFeeService.name);

  @Cron('* * 8 * * *')
  async calculateFee() {
    await this.feeService.create();
  }
}
