import { CityController } from './city.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { ICityRepository } from './interface/cityRepo.interface';
import { CityRepository } from './repository/city.repository';
import {
  CountryModule,
  countryServiceProvider,
} from '../country/country.module';
import { ICityService } from './interface/cityService.interface';
const cityRepositoryProvider = [
  {
    provide: ICityRepository,
    useClass: CityRepository,
  },
];
export const cityServiceProvider = [
  {
    provide: ICityService,
    useClass: CityService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([City])],
  controllers: [CityController],
  providers: [
    CityService,
    ...cityRepositoryProvider,
    // ...countryServiceProvider,
  ],
  exports: [...cityRepositoryProvider],
})
export class CityModule {}
