import { CityController } from './city.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { ICityRepository } from './interface/cityRep.interface';
import { CityRepository } from './repository/city.repository';
const cityRepositoryProvider = [
  {
    provide: ICityRepository,
    useClass: CityRepository,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [CityService, ...cityRepositoryProvider],
})
export class CityModule {}
