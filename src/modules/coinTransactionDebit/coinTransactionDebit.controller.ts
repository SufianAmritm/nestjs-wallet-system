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
import { CoinTransactionDebitDto } from './dto/coinTransactionDebit.dto';
import { CoinTransactionDebitService } from './coinTransactionDebit.service';
import { CoinTransactionDebit } from './entity/coinTransactionDebit.entity';
import { DeleteResult } from 'typeorm';
import { CoinTransactionDebitUpdateDto } from './dto/coinTransactionDebitUpdate.dto';
import { CoinTransactionDebitSearchDto } from './dto/coinTransactionDebitSearch.dto';

@Controller('coinTransactionDebit')
export class CoinTransactionDebitController {
  constructor(
    @Inject(CoinTransactionDebitService)
    private readonly coinTransactionDebitService: CoinTransactionDebitService,
  ) {}
  @Get()
  async findAllCoins(): Promise<CoinTransactionDebit[]> {
    return await this.coinTransactionDebitService.findAllCoinTransactionDebits();
  }
  @Post()
  async postCoinTransactionDebit(
    @Body() body: CoinTransactionDebitDto,
  ): Promise<any> {
    return await this.coinTransactionDebitService.postCoinTransactionDebit(
      body,
    );
  }
  @Get('search')
  async findCoinTransactionDebitByPattern(
    @Query() query: CoinTransactionDebitSearchDto,
  ): Promise<CoinTransactionDebit[] | void> {
    return await this.coinTransactionDebitService.findCoinRelationsAndSearch(
      query,
    );
  }
  @Get(':id')
  async getOneCoinTransactionDebit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CoinTransactionDebit[] | void> {
    return await this.coinTransactionDebitService.findOneCoinTransactionDebit(
      id,
    );
  }
  @Patch(':id')
  async updateCoinTransactionDebit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CoinTransactionDebitUpdateDto,
  ) {
    return await this.coinTransactionDebitService.updateCoinTransactionDebit(
      id,
      body,
    );
  }
  @Delete(':id')
  async deleteCoinTransactionDebit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.coinTransactionDebitService.deleteCoinTransactionDebit(
      id,
    );
  }
}
