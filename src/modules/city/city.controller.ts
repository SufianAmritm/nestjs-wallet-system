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
import { CityDto } from './dto/city.dto';
import { CityService } from './city.service';
import { City } from './entity/city.entity';
import { DeleteResult } from 'typeorm';
import { CityUpdateDto } from './dto/cityUpdate.dto';
import { CitySearchDto } from './dto/citySearch.dto';
import { User } from '../user/entity/user.entity';

@Controller('city')
export class CityController {
  constructor(@Inject(CityService) private readonly cityService: CityService) {}
  @Get()
  async findAllCities(): Promise<City[]> {
    return await this.cityService.findAllCities();
  }
  @Post()
  async postCity(@Body() body: CityDto): Promise<any> {
    return await this.cityService.postCity(body);
  }
  @Get('search')
  async findCityRelationsAndSearch(
    @Query() query: {},
  ): Promise<City[] | User[]> {
    return await this.cityService.findCityRelationsAndSearch(query, false);
  }
  @Get(':id')
  async findOneCity(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<City[] | void> {
    return await this.cityService.findOneCity(id);
  }
  @Patch(':id')
  async updateCity(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CityUpdateDto,
  ) {
    return await this.cityService.updateCity(id, body);
  }
  @Delete(':id')
  async deleteCity(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.cityService.deleteCity(id);
  }
}
