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
import { WalletDto } from './dto/wallet.dto';
import { WalletService } from './wallet.service';
import { Wallet } from './entity/wallet.entity';
import { DeleteResult } from 'typeorm';
import { WalletUpdateDto } from './dto/walletUpdate.dto';
import { WalletSearchDto } from './dto/walletSearch.dto';

@Controller('wallet')
export class WalletController {
  constructor(
    @Inject(WalletService) private readonly walletService: WalletService,
  ) {}
  @Get()
  async findAllWallets(): Promise<Wallet[]> {
    return await this.walletService.findAllWallets();
  }
  @Post()
  async postWallet(@Body() body: WalletDto): Promise<any> {
    return await this.walletService.postWallet(body);
  }
  @Get('search')
  async findWalletByPattern(
    @Query() query: WalletSearchDto,
  ): Promise<Wallet[] | void> {
    return await this.walletService.findWalletRelationsAndSearch(query);
  }
  @Get(':id')
  async findOneWallet(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Wallet[] | void> {
    return await this.walletService.findOneWallet(id);
  }
  @Patch(':id')
  async updateWallet(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: WalletUpdateDto,
  ) {
    return await this.walletService.updateWallet(id, body);
  }
  @Delete(':id')
  async deleteWallet(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.walletService.deleteWallet(id);
  }
}
