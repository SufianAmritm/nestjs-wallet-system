import { CoinsController } from './coins.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CoinsService } from './coins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coins } from './entity/coins.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coins])],
  controllers: [CoinsController],
  providers: [CoinsService],
})
export class CoinsModule {}
