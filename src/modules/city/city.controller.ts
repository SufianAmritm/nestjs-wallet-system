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
import { DeleteResult } from 'typeorm';

import { CityService } from './city.service';
import { CityDto } from './dto/city.dto';
import { CityUpdateDto } from './dto/cityUpdate.dto';
import { City } from './entity/city.entity';

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
  async citySearch(@Query() query: {}): Promise<City[] | void> {
    const findAllRelations: boolean = false;
    const findUsers: boolean = false;
    return await this.cityService.findCityRelationsAndSearch(
      query,
      findAllRelations,
      findUsers,
    );
  }
  @Get('users/:id')
  async findUsersByCityId(@Query() query: {}): Promise<City[] | void> {
    const findAllRelations: boolean = false;
    const findUsers: boolean = true;
    return await this.cityService.findCityRelationsAndSearch(
      query,
      findAllRelations,
      findUsers,
    );
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
