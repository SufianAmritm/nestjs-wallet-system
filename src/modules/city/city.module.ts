import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { City } from './entity/city.entity';
import { ICityRepository } from './interface/cityRepo.interface';
import { ICityService } from './interface/cityService.interface';
import { CityRepository } from './repository/city.repository';

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
