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
import { CoinTransactionCreditDto } from './dto/coinTransactionCredit.dto';
import { CoinTransactionCreditService } from './coinTransactionCredit.service';
import { CoinTransactionCredit } from './entity/coinTransactionCredit.entity';
import { DeleteResult } from 'typeorm';
import { CoinTransactionCreditUpdateDto } from './dto/coinTransactionCreditUpdate.dto';
import { CoinTransactionCreditSearchDto } from './dto/coinTransactionCreditSearch.dto';

@Controller('coinTransactionCredit')
export class CoinTransactionCreditController {
  constructor(
    @Inject(CoinTransactionCreditService)
    private readonly coinTransactionCreditService: CoinTransactionCreditService,
  ) {}
  @Get()
  async findAllCoins(): Promise<CoinTransactionCredit[]> {
    return await this.coinTransactionCreditService.findAllCoinTransactionCredits();
  }
  @Post()
  async postCoinTransactionCredit(
    @Body() body: CoinTransactionCreditDto,
  ): Promise<any> {
    return await this.coinTransactionCreditService.postCoinTransactionCredit(
      body,
    );
  }
  @Get('search')
  async findCoinTransactionCreditByPattern(
    @Query() query: CoinTransactionCreditSearchDto,
  ): Promise<CoinTransactionCredit[] | void> {
    return await this.coinTransactionCreditService.findCoinRelationsAndSearch(
      query,
    );
  }
  @Get(':id')
  async getOneCoinTransactionCredit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoinTransactionCredit[] | void> {
    return await this.coinTransactionCreditService.findOneCoinTransactionCredit(
      id,
    );
  }
  @Patch(':id')
  async updateCoinTransactionCredit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CoinTransactionCreditUpdateDto,
  ) {
    return await this.coinTransactionCreditService.updateCoinTransactionCredit(
      id,
      body,
    );
  }
  @Delete(':id')
  async deleteCoinTransactionCredit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.coinTransactionCreditService.deleteCoinTransactionCredit(
      id,
    );
  }
}
