import { CoinsController } from './coins.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coins } from './entity/coins.entity';
import { ICoinsRepository } from './interface/coinsRepo.interface';
import { CoinsRepository } from './repository/coins.repository';
import { ICoinsService } from './interface/coinsService.interface';
const coinsRepositoryProvide = [
  {
    provide: ICoinsRepository,
    useClass: CoinsRepository,
  },
];
export const coinsServiceProvider = [
  { provide: ICoinsService, useClass: CoinsService },
];
@Module({
  imports: [TypeOrmModule.forFeature([Coins])],
  controllers: [CoinsController],
  providers: [CoinsService, ...coinsRepositoryProvide, ...coinsServiceProvider],
  exports: [...coinsServiceProvider],
})
export class CoinsModule {}
