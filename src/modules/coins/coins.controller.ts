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
import { CoinsDto } from './dto/coins.dto';
import { CoinsService } from './coins.service';
import { Coins } from './entity/coins.entity';
import { DeleteResult } from 'typeorm';
import { CoinsUpdateDto } from './dto/coinsUpdate.dto';
import { CoinsSearchDto } from './dto/coinsSearch.dto';

@Controller('coins')
export class CoinsController {
  constructor(
    @Inject(CoinsService) private readonly coinsService: CoinsService,
  ) {}
  @Get()
  async findAllCoins(): Promise<Coins[]> {
    return await this.coinsService.findAllCoins();
  }
  @Post()
  async postCoins(@Body() body: CoinsDto): Promise<any> {
    return await this.coinsService.postCoins(body);
  }
  @Get('search')
  async findCoinsRelationsAndSearch(
    @Query() query: {},
  ): Promise<Coins[] | void> {
    return await this.coinsService.findCoinsRelationsAndSearch(query);
  }
  @Get(':id')
  async getOneCoins(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Coins[] | void> {
    return await this.coinsService.findOneCoins(id);
  }
  @Patch(':id')
  async updateCoins(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CoinsUpdateDto,
  ) {
    return await this.coinsService.updateCoins(id, body);
  }
  @Delete(':id')
  async deleteCoins(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.coinsService.deleteCoins(id);
  }
}
