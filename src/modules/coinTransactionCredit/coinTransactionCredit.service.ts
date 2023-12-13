/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { ICoinTransactionCreditRepository } from './interface/coinTransactionCreditRepo.interface';
import { CoinTransactionCreditDto } from './dto/coinTransactionCredit.dto';
import { CoinTransactionCredit } from './entity/coinTransactionCredit.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { CoinTransactionCreditUpdateDto } from './dto/coinTransactionCreditUpdate.dto';
import { CoinTransactionCreditSearchDto } from './dto/coinTransactionCreditSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';
import { validPattern } from 'src/utils/valid/pattern.valid';
import { ICoinTransactionService } from '../coinTransaction/interface/coinTransactionService.interface';
import { CoinTransaction } from '../coinTransaction/entity/coinTransaction.entity';
import { validCredit } from 'src/utils/valid/credit.valid';
import { creditInputValidation } from 'src/utils/valid/creditInput.valid';

@Injectable()
export class CoinTransactionCreditService {
  constructor(
    @Inject(ICoinTransactionCreditRepository)
    private readonly repository: ICoinTransactionCreditRepository,
    @Inject(ICoinTransactionService)
    private readonly coinTransactionService: ICoinTransactionService,
  ) {}
  public tableName: string = this.repository.tableName;

  async creditValidation(transactionId: number): Promise<number> {
    const coinTransaction: CoinTransaction[] | void =
      await this.coinTransactionService.findOneCoinTransaction(transactionId);
    let credit: boolean;
    if (Array.isArray(coinTransaction) && coinTransaction.length > 0) {
      credit = coinTransaction[0].credit;
    }
    validCredit(credit, this.tableName);
    return coinTransaction[0].creditAmount;
  }

  async postCoinTransactionCredit(
    body: CoinTransactionCreditDto,
  ): Promise<CoinTransactionCredit | void> {
    const data: CoinTransactionCredit = plainToClass(
      CoinTransactionCredit,
      body,
    );

    creditInputValidation(data);
    data.amount = await this.creditValidation(data.transactionId);

    return await this.repository.postData(data);
  }

  async postCoinTransactionCreditWithTransaction(
    body: CoinTransactionCreditDto,
  ): Promise<CoinTransactionCredit> {
    const data: CoinTransactionCredit = plainToClass(
      CoinTransactionCredit,
      body,
    );
    creditInputValidation(data);
    data.amount = await this.creditValidation(data.transactionId);

    return await this.repository.postDataWithTransaction(data);
  }
  async findAllCoinTransactionCredits(): Promise<CoinTransactionCredit[]> {
    return await this.repository.findAll();
  }
  async findOneCoinTransactionCredit(
    id: number,
  ): Promise<CoinTransactionCredit[] | void> {
    const findOption: FindOptionsWhere<CoinTransactionCredit> = { id: id };

    const result: CoinTransactionCredit[] =
      await this.repository.findById(findOption);

    return validResult<CoinTransactionCredit[]>(result, this.tableName);
  }
  async updateCoinTransactionCredit(
    id: number,
    body: CoinTransactionCreditUpdateDto,
  ): Promise<UpdateResult> {
    const data: CoinTransactionCredit = plainToClass(
      CoinTransactionCredit,
      body,
    );
    if (data.transactionId) {
      data.amount = await this.creditValidation(data.transactionId);
    }
    const findOption: FindOptionsWhere<CoinTransactionCredit> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateCoinTransactionCreditWithTransaction(
    id: number,
    body: CoinTransactionCreditUpdateDto,
  ): Promise<UpdateResult> {
    const data: CoinTransactionCredit = plainToClass(
      CoinTransactionCredit,
      body,
    );
    if (data.transactionId) {
      data.amount = await this.creditValidation(data.transactionId);
    }
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      CoinTransactionCredit,
    );
  }
  async deleteCoinTransactionCredit(id: number): Promise<DeleteResult> {
    return await this.repository.deleteCoinTransactionCredit(id);
  }
  async findCoinRelationsAndSearch(
    pattern: CoinTransactionCreditSearchDto,
  ): Promise<CoinTransactionCredit[] | void> {
    validPattern<CoinTransactionCreditSearchDto>(pattern, this.tableName);

    const result = await this.repository.findCoinRelationsAndSearch(pattern);

    return validResult<CoinTransactionCredit[]>(result, this.tableName);
  }
}
