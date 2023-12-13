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
import { WalletTransactionDebitDto } from './dto/walletTransactionDebit.dto';
import { WalletTransactionDebitService } from './walletTransactionDebit.service';
import { WalletTransactionDebit } from './entity/walletTransactionDebit.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionDebitUpdateDto } from './dto/walletTransactionDebitUpdate.dto';
import { WalletTransactionDebitSearchDto } from './dto/walletTransactionDebitSearch.dto';

@Controller('walletTransactionDebit')
export class WalletTransactionDebitController {
  constructor(
    @Inject(WalletTransactionDebitService)
    private readonly walletTransactionDebitService: WalletTransactionDebitService,
  ) {}
  @Get()
  async findAllWallets(): Promise<WalletTransactionDebit[]> {
    return await this.walletTransactionDebitService.findAllWalletTransactionDebits();
  }
  @Post()
  async postWalletTransactionDebit(
    @Body() body: WalletTransactionDebitDto,
  ): Promise<any> {
    return await this.walletTransactionDebitService.postWalletTransactionDebit(
      body,
    );
  }
  @Get('search')
  async findWalletTransactionDebitByPattern(
    @Query() query: WalletTransactionDebitSearchDto,
  ): Promise<WalletTransactionDebit[] | void> {
    return await this.walletTransactionDebitService.findWalletRelationsAndSearch(
      query,
    );
  }
  @Get(':id')
  async getOneWalletTransactionDebit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WalletTransactionDebit[] | void> {
    return await this.walletTransactionDebitService.findOneWalletTransactionDebit(
      id,
    );
  }
  @Patch(':id')
  async updateWalletTransactionDebit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: WalletTransactionDebitUpdateDto,
  ) {
    return await this.walletTransactionDebitService.updateWalletTransactionDebit(
      id,
      body,
    );
  }
  @Delete(':id')
  async deleteWalletTransactionDebit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.walletTransactionDebitService.deleteWalletTransactionDebit(
      id,
    );
  }
}
