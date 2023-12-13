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
import { WalletTransactionDto } from './dto/walletTransaction.dto';
import { WalletTransactionService } from './walletTransaction.service';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionUpdateDto } from './dto/walletTransactionUpdate.dto';
import { WalletTransactionSearchDto } from './dto/walletTransactionSearch.dto';

@Controller('walletTransaction')
export class WalletTransactionController {
  constructor(
    @Inject(WalletTransactionService)
    private readonly walletTransactionService: WalletTransactionService,
  ) {}
  @Get()
  async findAllWallets(): Promise<WalletTransaction[]> {
    return await this.walletTransactionService.findAllWalletTransactions();
  }
  @Post()
  async postWalletTransaction(
    @Body() body: WalletTransactionDto,
  ): Promise<any> {
    return await this.walletTransactionService.postWalletTransactionWithTransaction(
      body,
    );
  }
  @Get('search')
  async findWalletTransactionByPattern(
    @Query() query: WalletTransactionSearchDto,
  ): Promise<WalletTransaction[] | void> {
    return await this.walletTransactionService.findWalletRelationsAndSearch(
      query,
    );
  }
  @Get(':id')
  async getOneWalletTransaction(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WalletTransaction[] | void> {
    return await this.walletTransactionService.findOneWalletTransaction(id);
  }
  @Patch(':id')
  async updateWalletTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: WalletTransactionUpdateDto,
  ) {
    return await this.walletTransactionService.updateWalletTransaction(
      id,
      body,
    );
  }
  @Delete(':id')
  async deleteWalletTransaction(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.walletTransactionService.deleteWalletTransaction(id);
  }
}
