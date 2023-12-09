/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { IWalletTransactionRepository } from './interface/walletTransactionRepo.interface';
import { WalletTransactionDto } from './dto/walletTransaction.dto';
import { WalletTransaction } from './entity/walletTransaction.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, In, UpdateResult } from 'typeorm';
import { MESSAGE } from 'src/common/customMessages';
import { WalletTransactionUpdateDto } from './dto/walletTransactionUpdate.dto';
import { WalletTransactionSearchDto } from './dto/walletTransactionSearch.dto';
import { Wallet } from '../wallet/entity/wallet.entity';
import { IWalletService } from '../wallet/interface/walletService.interface';

@Injectable()
export class WalletTransactionService {
  constructor(
    @Inject(IWalletTransactionRepository)
    private readonly repository: IWalletTransactionRepository,
    @Inject(IWalletService)
    private readonly walletService: IWalletService,
  ) {}

  async postWalletTransaction(
    body: WalletTransactionDto,
  ): Promise<WalletTransaction | void> {
    const { credit, debit, walletId, amount } = body;

    if (
      (debit === true && credit === true) ||
      (debit === false && credit === false)
    ) {
      throw new Error(MESSAGE.INVALID_CREDIT_DEBIT);
    }
    const wallet: Wallet = (
      await this.walletService.findOneWallet(walletId)
    ).at(0);
    const { balance: openingWalletBalance } = wallet;
    delete wallet.id;
    if (credit) {
      wallet.balance = wallet.balance + amount;

      await this.walletService.updateWalletWithTransaction(walletId, wallet);
    }
    if (debit) {
      wallet.balance = wallet.balance - amount;
      await this.walletService.updateWalletWithTransaction(walletId, wallet);
    }
    const data: WalletTransaction = plainToClass(WalletTransaction, body);
    data.openingWalletBalance = openingWalletBalance;
    data.closingWalletBalance = wallet.balance;
    return await this.repository.postData(data);
  }

  async postWalletTransactionWithTransaction(
    body: WalletTransactionDto,
  ): Promise<WalletTransaction> {
    const { credit, debit, walletId, amount } = body;

    if (
      (debit === true && credit === true) ||
      (debit === false && credit === false)
    ) {
      throw new Error(MESSAGE.INVALID_CREDIT_DEBIT);
    }

    const wallet: Wallet = (
      await this.walletService.findOneWallet(walletId)
    ).at(0);

    const { balance: openingWalletBalance } = wallet;
    delete wallet.id;
    if (credit) {
      wallet.balance = openingWalletBalance + amount;
      await this.walletService.updateWalletWithTransaction(walletId, wallet);
    }
    if (debit) {
      wallet.balance = wallet.balance - amount;
      await this.walletService.updateWalletWithTransaction(walletId, wallet);
    }

    const data: WalletTransaction = plainToClass(WalletTransaction, body);
    data.openingWalletBalance = openingWalletBalance;
    data.closingWalletBalance = wallet.balance;
    return await this.repository.postDataWithTransaction(data);
  }
  async findAllWalletTransactions(): Promise<WalletTransaction[]> {
    return await this.repository.findAll();
  }
  async findOneWalletTransaction(
    id: number,
  ): Promise<WalletTransaction[] | void> {
    const findOption: FindOptionsWhere<WalletTransaction> = { id: id };

    const result: WalletTransaction[] =
      await this.repository.findById(findOption);

    if (result.length > 0) {
      return result;
    } else {
      throw new Error(`${MESSAGE.NOT_FOUND} in ${this.repository.tableName}`);
    }
  }
  async updateWalletTransaction(
    id: number,
    body: WalletTransactionUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransaction = plainToClass(WalletTransaction, body);
    const findOption: FindOptionsWhere<WalletTransaction> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateWalletTransactionWithTransaction(
    id: number,
    body: WalletTransactionUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransaction = plainToClass(WalletTransaction, body);
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      WalletTransaction,
    );
  }
  async deleteWalletTransaction(id: number): Promise<DeleteResult> {
    return await this.repository.deleteWalletTransaction(id);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletTransactionSearchDto,
  ): Promise<WalletTransaction[] | string> {
    if (Object.keys(pattern).length === 0) {
      throw new Error(
        `${MESSAGE.EMPTY_SEARCH_QUERY} in ${this.repository.tableName}`,
      );
    }
    const result = await this.repository.findWalletRelationsAndSearch(pattern);
    console.log(result);
    if (result.length > 0) {
      return result;
    } else {
      throw new Error(`${MESSAGE.NOT_FOUND} in ${this.repository.tableName}`);
    }
  }
}
