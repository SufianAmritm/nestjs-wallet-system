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
import { CoinTransactionDto } from './dto/coinTransaction.dto';
import { CoinTransactionService } from './coinTransaction.service';
import { CoinTransaction } from './entity/coinTransaction.entity';
import { DeleteResult } from 'typeorm';
import { CoinTransactionUpdateDto } from './dto/coinTransactionUpdate.dto';
import { CoinTransactionSearchDto } from './dto/coinTransactionSearch.dto';

@Controller('coinTransaction')
export class CoinTransactionController {
  constructor(
    @Inject(CoinTransactionService)
    private readonly coinTransactionService: CoinTransactionService,
  ) {}
  @Get()
  async findAllWallets(): Promise<CoinTransaction[]> {
    return await this.coinTransactionService.findAllCoinTransactions();
  }
  @Post()
  async postCoinTransaction(@Body() body: CoinTransactionDto): Promise<any> {
    return await this.coinTransactionService.postCoinTransactionWithTransaction(
      body,
    );
  }
  @Get('search')
  async findCoinTransactionByPattern(
    @Query() query: {},
  ): Promise<CoinTransaction[] | string> {
    return await this.coinTransactionService.findCoinsRelationsAndSearch(query);
  }
  @Get(':id')
  async getOneCoinTransaction(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoinTransaction[] | void> {
    return await this.coinTransactionService.findOneCoinTransaction(id);
  }
  @Patch(':id')
  async updateCoinTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CoinTransactionUpdateDto,
  ) {
    return await this.coinTransactionService.updateCoinTransaction(id, body);
  }
  @Delete(':id')
  async deleteCoinTransaction(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.coinTransactionService.deleteCoinTransaction(id);
  }
}
