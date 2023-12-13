/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICoinTransactionDebitRepository } from './interface/coinTransactionDebitRepo.interface';
import { CoinTransactionDebitDto } from './dto/coinTransactionDebit.dto';
import { CoinTransactionDebit } from './entity/coinTransactionDebit.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { CoinTransactionDebitUpdateDto } from './dto/coinTransactionDebitUpdate.dto';
import { CoinTransactionDebitSearchDto } from './dto/coinTransactionDebitSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';
import { validPattern } from 'src/utils/valid/pattern.valid';
import { ICoinTransactionService } from '../coinTransaction/interface/coinTransactionService.interface';
import { CoinTransaction } from '../coinTransaction/entity/coinTransaction.entity';
import { validDebit } from 'src/utils/valid/debit.valid';
import { debitInputValidation } from 'src/utils/valid/debitInput.valid';

@Injectable()
export class CoinTransactionDebitService {
  constructor(
    @Inject(ICoinTransactionDebitRepository)
    private readonly repository: ICoinTransactionDebitRepository,
    @Inject(ICoinTransactionService)
    private readonly coinTransactionService: ICoinTransactionService,
  ) {}
  public tableName: string = this.repository.tableName;

  async debitValidation(transactionId: number): Promise<number> {
    const coinTransaction: CoinTransaction[] | void =
      await this.coinTransactionService.findOneCoinTransaction(transactionId);
    let debit: boolean;
    if (Array.isArray(coinTransaction) && coinTransaction.length > 0) {
      debit = coinTransaction[0].debit;
    }
    validDebit(debit, this.tableName);
    return coinTransaction[0].debitAmount;
  }

  async postCoinTransactionDebit(
    body: CoinTransactionDebitDto,
  ): Promise<CoinTransactionDebit | void> {
    const data: CoinTransactionDebit = plainToClass(CoinTransactionDebit, body);

    debitInputValidation(data);
    data.amount = await this.debitValidation(data.transactionId);

    return await this.repository.postData(data);
  }

  async postCoinTransactionDebitWithTransaction(
    body: CoinTransactionDebitDto,
  ): Promise<CoinTransactionDebit> {
    const data: CoinTransactionDebit = plainToClass(CoinTransactionDebit, body);
    debitInputValidation(data);
    data.amount = await this.debitValidation(data.transactionId);

    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCoinTransactionDebits(): Promise<CoinTransactionDebit[]> {
    return await this.repository.findAll();
  }
  async findOneCoinTransactionDebit(
    id: number,
  ): Promise<CoinTransactionDebit[] | void> {
    const findOption: FindOptionsWhere<CoinTransactionDebit> = { id: id };

    const result: CoinTransactionDebit[] =
      await this.repository.findById(findOption);

    return validResult<CoinTransactionDebit[]>(result, this.tableName);
  }
  async updateCoinTransactionDebit(
    id: number,
    body: CoinTransactionDebitUpdateDto,
  ): Promise<UpdateResult> {
    const data: CoinTransactionDebit = plainToClass(CoinTransactionDebit, body);
    if (data.transactionId) {
      data.amount = await this.debitValidation(data.transactionId);
    }
    const findOption: FindOptionsWhere<CoinTransactionDebit> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateCoinTransactionDebitWithTransaction(
    id: number,
    body: CoinTransactionDebitUpdateDto,
  ): Promise<UpdateResult> {
    const data: CoinTransactionDebit = plainToClass(CoinTransactionDebit, body);
    if (data.transactionId) {
      data.amount = await this.debitValidation(data.transactionId);
    }
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      CoinTransactionDebit,
    );
  }
  async deleteCoinTransactionDebit(id: number): Promise<DeleteResult> {
    return await this.repository.deleteCoinTransactionDebit(id);
  }
  async findCoinRelationsAndSearch(
    pattern: CoinTransactionDebitSearchDto,
  ): Promise<CoinTransactionDebit[] | void> {
    validPattern<CoinTransactionDebitSearchDto>(pattern, this.tableName);

    const result = await this.repository.findCoinRelationsAndSearch(pattern);

    return validResult<CoinTransactionDebit[]>(result, this.tableName);
  }
}
