import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';

import { Module } from '@nestjs/common';
import { Country } from './entity/country.entity';

import { CountryRepository } from './repository/country.repository';
import { ICountryRepository } from './interface/countryRepo.interface';
import { ICountryService } from './interface/countryService.interface';
import { CityModule } from '../city/city.module';
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
  imports: [TypeOrmModule.forFeature([Country]), CityModule],
  controllers: [CountryController],
  providers: [CountryService, ...countryRepositoryProvider],
})
export class CountryModule {}
