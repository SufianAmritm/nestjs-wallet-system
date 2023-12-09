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

import { ICityService } from './interface/cityService.interface';
import { UserModule } from '../user/user.module';
const cityRepositoryProvider = [
  {
    provide: ICityRepository,
    useClass: CityRepository,
  },
];
const cityServiceProvider = [
  {
    provide: ICityService,
    useClass: CityService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([City]), UserModule],
  controllers: [CityController],
  providers: [CityService, ...cityRepositoryProvider, ...cityServiceProvider],
  exports: [...cityRepositoryProvider, ...cityServiceProvider],
})
export class CityModule {}
