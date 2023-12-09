/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICoinTransactionRepository } from './interface/coinTransactionRepo.interface';
import { CoinTransactionDto } from './dto/coinTransaction.dto';
import { CoinTransaction } from './entity/coinTransaction.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, In, UpdateResult } from 'typeorm';
import { MESSAGE } from 'src/common/customMessages';
import { CoinTransactionUpdateDto } from './dto/coinTransactionUpdate.dto';
import { CoinTransactionSearchDto } from './dto/coinTransactionSearch.dto';
import { Coins } from '../coins/entity/coins.entity';
import { ICoinsService } from '../coins/interface/coinsService.interface';

@Injectable()
export class CoinTransactionService {
  constructor(
    @Inject(ICoinTransactionRepository)
    private readonly repository: ICoinTransactionRepository,
    @Inject(ICoinsService)
    private readonly coinsService: ICoinsService,
  ) {}

  async postCoinTransaction(
    body: CoinTransactionDto,
  ): Promise<CoinTransaction | void> {
    const { credit, debit, coinsId, amount } = body;

    if (
      (debit === true && credit === true) ||
      (debit === false && credit === false)
    ) {
      throw new Error(MESSAGE.INVALID_CREDIT_DEBIT);
    }
    const coins: Coins = (await this.coinsService.findOneCoins(coinsId)).at(0);
    const { amount: openingCoinsAmount } = coins;
    delete coins.id;
    if (credit) {
      coins.amount = coins.amount + amount;

      await this.coinsService.updateCoinsWithTransaction(coinsId, coins);
    }
    if (debit) {
      coins.amount = coins.amount - amount;
      await this.coinsService.updateCoinsWithTransaction(coinsId, coins);
    }
    const data: CoinTransaction = plainToClass(CoinTransaction, body);
    data.openingCoinsAmount = openingCoinsAmount;
    data.closingCoinsAmount = coins.amount;
    return await this.repository.postData(data);
  }

  async postCoinTransactionWithTransaction(
    body: CoinTransactionDto,
  ): Promise<CoinTransaction> {
    const { credit, debit, coinsId, amount } = body;

    if (
      (debit === true && credit === true) ||
      (debit === false && credit === false)
    ) {
      throw new Error(MESSAGE.INVALID_CREDIT_DEBIT);
    }

    const coins: Coins = (await this.coinsService.findOneCoins(coinsId)).at(0);

    const { amount: openingCoinsAmount } = coins;
    delete coins.id;
    if (credit) {
      coins.amount = openingCoinsAmount + amount;
      await this.coinsService.updateCoinsWithTransaction(coinsId, coins);
    }
    if (debit) {
      coins.amount = coins.amount - amount;
      await this.coinsService.updateCoinsWithTransaction(coinsId, coins);
    }

    const data: CoinTransaction = plainToClass(CoinTransaction, body);
    data.openingCoinsAmount = openingCoinsAmount;
    data.closingCoinsAmount = coins.amount;
    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCoinTransactions(): Promise<CoinTransaction[]> {
    return await this.repository.findAll();
  }
  async findOneCoinTransaction(id: number): Promise<CoinTransaction[] | void> {
    const findOption: FindOptionsWhere<CoinTransaction> = { id: id };

    const result: CoinTransaction[] =
      await this.repository.findById(findOption);

    if (result.length > 0) {
      return result;
    } else {
      throw new Error(`${MESSAGE.NOT_FOUND} in ${this.repository.tableName}`);
    }
  }
  async updateCoinTransaction(
    id: number,
    body: CoinTransactionUpdateDto,
  ): Promise<UpdateResult> {
    const data: CoinTransaction = plainToClass(CoinTransaction, body);
    const findOption: FindOptionsWhere<CoinTransaction> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateCoinTransactionWithTransaction(
    id: number,
    body: CoinTransactionUpdateDto,
  ): Promise<UpdateResult> {
    const data: CoinTransaction = plainToClass(CoinTransaction, body);
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      CoinTransaction,
    );
  }
  async deleteCoinTransaction(id: number): Promise<DeleteResult> {
    return await this.repository.deleteCoinTransaction(id);
  }
  async findCoinsRelationsAndSearch(
    pattern: CoinTransactionSearchDto,
  ): Promise<CoinTransaction[] | string> {
    if (Object.keys(pattern).length === 0) {
      throw new Error(
        `${MESSAGE.EMPTY_SEARCH_QUERY} in ${this.repository.tableName}`,
      );
    }
    const result = await this.repository.findCoinsRelationsAndSearch(pattern);
    console.log(result);
    if (result.length > 0) {
      return result;
    } else {
      throw new Error(`${MESSAGE.NOT_FOUND} in ${this.repository.tableName}`);
    }
  }
}
