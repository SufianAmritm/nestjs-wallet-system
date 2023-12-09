import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { Country } from './entity/country.entity';

import { CountryRepository } from './repository/country.repository';
import { ICountryRepository } from './interface/countryRepo.interface';
import { ICountryService } from './interface/countryService.interface';
const countryRepositoryProvider = [
  {
    provide: ICountryRepository,
    useClass: CountryRepository,
  },
];
export const countryServiceProvider = [
  { provide: ICountryService, useClass: CountryService },
];
@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountryController],
  providers: [CountryService, ...countryRepositoryProvider],
})
export class CountryModule {}
