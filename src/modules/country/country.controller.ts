/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CountryDto } from './dto/country.dto';
import { CountryService } from './country.service';
import { Country } from './entity/country.entity';
import { DeleteResult } from 'typeorm';
import { CountryUpdateDto } from './dto/countryUpdate.dto';
import { CountrySearchDto } from './dto/countrySearch.dto';
import { City } from '../city/entity/city.entity';

@Controller('country')
export class CountryController {
  constructor(
    @Inject(CountryService) private readonly countryService: CountryService,
  ) {}
  @Get()
  async findAllCountries(): Promise<Country[]> {
    return await this.countryService.findAll();
  }
  @Post()
  async postCountry(@Body() body: CountryDto): Promise<any> {
    return await this.countryService.postCountry(body);
  }
  @Get('search')
  async countrySearch(@Query() query: {}): Promise<Country[] | City[] | void> {
    const findCity: boolean = false;
    const findAllRelations: boolean = false;
    return await this.countryService.findCountryRelationsAndSearch(
      query,
      findAllRelations,
      findCity,
    );
  }
  @Get('cities/:id')
  async findCitiesByCountryId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Country[] | City[] | void> {
    const findCity: boolean = true;
    const findAllRelations: boolean = false;
    return await this.countryService.findCountryRelationsAndSearch(
      { id: id },
      findAllRelations,
      findCity,
    );
  }
  @Get(':id')
  async findOneCountry(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Country[] | void> {
    return await this.countryService.findOneCountry(id);
  }
  @Patch(':id')
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CountryUpdateDto,
  ) {
    return await this.countryService.updateCountry(id, body);
  }
  @Delete(':id')
  async deleteCountry(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.countryService.deleteCountry(id);
  }
}
