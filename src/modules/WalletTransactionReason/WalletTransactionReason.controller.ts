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
import { WalletTransactionReasonDto } from './dto/walletTransactionReason.dto';
import { WalletTransactionReasonService } from './walletTransactionReason.service';
import { WalletTransactionReason } from './entity/walletTransactionReason.entity';
import { DeleteResult } from 'typeorm';
import { WalletTransactionReasonUpdateDto } from './dto/walletTransactionReasonUpdate.dto';

import { City } from '../city/entity/city.entity';

@Controller('walletTransactionReason')
export class WalletTransactionReasonController {
  constructor(
    @Inject(WalletTransactionReasonService)
    private readonly walletTransactionReasonService: WalletTransactionReasonService,
  ) {}
  @Get()
  async findAllCountries(): Promise<WalletTransactionReason[]> {
    return await this.walletTransactionReasonService.findAll();
  }
  @Post()
  async postWalletTransactionReason(
    @Body() body: WalletTransactionReasonDto,
  ): Promise<any> {
    return await this.walletTransactionReasonService.postWalletTransactionReason(
      body,
    );
  }
  @Get('search')
  async findWalletTransactionReasonRelationsAndSearch(
    @Query() query: {},
  ): Promise<WalletTransactionReason[] | void> {
    return await this.walletTransactionReasonService.findWalletTransactionReasonRelationsAndSearch(
      query,
    );
  }
  @Get('cities')
  async findCitiesByWalletTransactionReason(
    @Query() query: {},
  ): Promise<WalletTransactionReason[] | City[] | void> {
    return await this.walletTransactionReasonService.findWalletTransactionReasonRelationsAndSearch(
      query,
    );
  }
  @Get(':id')
  async findOneWalletTransactionReason(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WalletTransactionReason[] | void> {
    return await this.walletTransactionReasonService.findOneWalletTransactionReason(
      id,
    );
  }
  @Patch(':id')
  async updateWalletTransactionReason(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: WalletTransactionReasonUpdateDto,
  ) {
    return await this.walletTransactionReasonService.updateWalletTransactionReason(
      id,
      body,
    );
  }
  @Delete(':id')
  async deleteWalletTransactionReason(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.walletTransactionReasonService.deleteWalletTransactionReason(
      id,
    );
  }
}
