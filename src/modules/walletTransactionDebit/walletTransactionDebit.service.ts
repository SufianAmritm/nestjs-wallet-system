/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { IWalletTransactionDebitRepository } from './interface/walletTransactionDebitRepo.interface';
import { WalletTransactionDebitDto } from './dto/walletTransactionDebit.dto';
import { WalletTransactionDebit } from './entity/walletTransactionDebit.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { WalletTransactionDebitUpdateDto } from './dto/walletTransactionDebitUpdate.dto';
import { WalletTransactionDebitSearchDto } from './dto/walletTransactionDebitSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';
import { validPattern } from 'src/utils/valid/pattern.valid';
import { IWalletTransactionService } from '../walletTransaction/interface/walletTransactionService.interface';
import { WalletTransaction } from '../walletTransaction/entity/walletTransaction.entity';
import { validDebit } from 'src/utils/valid/debit.valid';
import { debitInputValidation } from 'src/utils/valid/debitInput.valid';

@Injectable()
export class WalletTransactionDebitService {
  constructor(
    @Inject(IWalletTransactionDebitRepository)
    private readonly repository: IWalletTransactionDebitRepository,
    @Inject(IWalletTransactionService)
    private readonly walletTransactionService: IWalletTransactionService,
  ) {}
  public tableName: string = this.repository.tableName;

  async debitValidation(transactionId: number): Promise<number> {
    const walletTransaction: WalletTransaction[] | void =
      await this.walletTransactionService.findOneWalletTransaction(
        transactionId,
      );
    let debit: boolean;
    if (Array.isArray(walletTransaction) && walletTransaction.length > 0) {
      debit = walletTransaction[0].debit;
    }
    validDebit(debit, this.tableName);
    return walletTransaction[0].debitAmount;
  }

  async postWalletTransactionDebit(
    body: WalletTransactionDebitDto,
  ): Promise<WalletTransactionDebit | void> {
    const data: WalletTransactionDebit = plainToClass(
      WalletTransactionDebit,
      body,
    );

    debitInputValidation(data);
    data.amount = await this.debitValidation(data.transactionId);

    return await this.repository.postData(data);
  }

  async postWalletTransactionDebitWithTransaction(
    body: WalletTransactionDebitDto,
  ): Promise<WalletTransactionDebit> {
    const data: WalletTransactionDebit = plainToClass(
      WalletTransactionDebit,
      body,
    );
    debitInputValidation(data);
    data.amount = await this.debitValidation(data.transactionId);

    return await this.repository.postDataWithTransaction(data);
  }
  async findAllWalletTransactionDebits(): Promise<WalletTransactionDebit[]> {
    return await this.repository.findAll();
  }
  async findOneWalletTransactionDebit(
    id: number,
  ): Promise<WalletTransactionDebit[] | void> {
    const findOption: FindOptionsWhere<WalletTransactionDebit> = { id: id };

    const result: WalletTransactionDebit[] =
      await this.repository.findById(findOption);

    return validResult<WalletTransactionDebit[]>(result, this.tableName);
  }
  async updateWalletTransactionDebit(
    id: number,
    body: WalletTransactionDebitUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionDebit = plainToClass(
      WalletTransactionDebit,
      body,
    );
    if (data.transactionId) {
      data.amount = await this.debitValidation(data.transactionId);
    }
    const findOption: FindOptionsWhere<WalletTransactionDebit> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateWalletTransactionDebitWithTransaction(
    id: number,
    body: WalletTransactionDebitUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionDebit = plainToClass(
      WalletTransactionDebit,
      body,
    );
    if (data.transactionId) {
      data.amount = await this.debitValidation(data.transactionId);
    }
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      WalletTransactionDebit,
    );
  }
  async deleteWalletTransactionDebit(id: number): Promise<DeleteResult> {
    return await this.repository.deleteWalletTransactionDebit(id);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletTransactionDebitSearchDto,
  ): Promise<WalletTransactionDebit[] | void> {
    validPattern<WalletTransactionDebitSearchDto>(pattern, this.tableName);

    const result = await this.repository.findWalletRelationsAndSearch(pattern);
    console.log(result);
    return validResult<WalletTransactionDebit[]>(result, this.tableName);
  }
}
