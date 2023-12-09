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
import { resultValid } from 'src/utils/valid/result.valid';
import { patternValid } from 'src/utils/valid/pattern.valid';

@Injectable()
export class CoinTransactionService {
  constructor(
    @Inject(ICoinTransactionRepository)
    private readonly repository: ICoinTransactionRepository,
    @Inject(ICoinsService)
    private readonly coinsService: ICoinsService,
  ) {}
  public readonly tableName: string = this.repository.tableName;
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
    const coins: Coins[] | void = await this.coinsService.findOneCoins(coinsId);
    let coinData: Coins;
    if (Array.isArray(coins) && coins.length > 0) {
      coinData = coins[0];
    }
    const { amount: openingCoinsAmount } = coinData;
    delete coinData.id;
    if (credit) {
      coinData.amount = coinData.amount + amount;

      await this.coinsService.updateCoinsWithTransaction(coinsId, coinData);
    }
    if (debit) {
      coinData.amount = coinData.amount - amount;
      await this.coinsService.updateCoinsWithTransaction(coinsId, coinData);
    }
    const data: CoinTransaction = plainToClass(CoinTransaction, body);
    data.openingCoinsAmount = openingCoinsAmount;
    data.closingCoinsAmount = coinData.amount;
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

    const coins: Coins[] | void = await this.coinsService.findOneCoins(coinsId);
    let coinData: Coins;
    if (Array.isArray(coins) && coins.length > 0) {
      coinData = coins[0];
    }
    const { amount: openingCoinsAmount } = coinData;
    delete coinData.id;
    if (credit) {
      coinData.amount = openingCoinsAmount + amount;
      await this.coinsService.updateCoinsWithTransaction(coinsId, coinData);
    }
    if (debit) {
      coinData.amount = coinData.amount - amount;
      await this.coinsService.updateCoinsWithTransaction(coinsId, coinData);
    }

    const data: CoinTransaction = plainToClass(CoinTransaction, body);
    data.openingCoinsAmount = openingCoinsAmount;
    data.closingCoinsAmount = coinData.amount;
    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCoinTransactions(): Promise<CoinTransaction[]> {
    return await this.repository.findAll();
  }
  async findOneCoinTransaction(id: number): Promise<CoinTransaction[] | void> {
    const findOption: FindOptionsWhere<CoinTransaction> = { id: id };

    const result: CoinTransaction[] =
      await this.repository.findById(findOption);

    return resultValid<CoinTransaction[]>(result, this.tableName);
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
  ): Promise<CoinTransaction[] | void> {
    patternValid<CoinTransactionSearchDto>(pattern, this.tableName);

    const result = await this.repository.findCoinsRelationsAndSearch(pattern);

    return resultValid<CoinTransaction[]>(result, this.tableName);
  }
}
