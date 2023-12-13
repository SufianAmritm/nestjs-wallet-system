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
import { WalletTransactionCreditDto } from './dto/walletTransactionCredit.dto';
import { WalletTransactionCreditService } from './walletTransactionCredit.service';
import { WalletTransactionCredit } from './entity/walletTransactionCredit.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionCreditUpdateDto } from './dto/walletTransactionCreditUpdate.dto';
import { WalletTransactionCreditSearchDto } from './dto/walletTransactionCreditSearch.dto';

@Controller('walletTransactionCredit')
export class WalletTransactionCreditController {
  constructor(
    @Inject(WalletTransactionCreditService)
    private readonly walletTransactionCreditService: WalletTransactionCreditService,
  ) {}
  @Get()
  async findAllWallets(): Promise<WalletTransactionCredit[]> {
    return await this.walletTransactionCreditService.findAllWalletTransactionCredits();
  }
  @Post()
  async postWalletTransactionCredit(
    @Body() body: WalletTransactionCreditDto,
  ): Promise<any> {
    return await this.walletTransactionCreditService.postWalletTransactionCredit(
      body,
    );
  }
  @Get('search')
  async findWalletTransactionCreditByPattern(
    @Query() query: WalletTransactionCreditSearchDto,
  ): Promise<WalletTransactionCredit[] | void> {
    return await this.walletTransactionCreditService.findWalletRelationsAndSearch(
      query,
    );
  }
  @Get(':id')
  async getOneWalletTransactionCredit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WalletTransactionCredit[] | void> {
    return await this.walletTransactionCreditService.findOneWalletTransactionCredit(
      id,
    );
  }
  @Patch(':id')
  async updateWalletTransactionCredit(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: WalletTransactionCreditUpdateDto,
  ) {
    return await this.walletTransactionCreditService.updateWalletTransactionCredit(
      id,
      body,
    );
  }
  @Delete(':id')
  async deleteWalletTransactionCredit(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.walletTransactionCreditService.deleteWalletTransactionCredit(
      id,
    );
  }
}
