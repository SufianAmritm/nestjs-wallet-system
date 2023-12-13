/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { IWalletTransactionCreditRepository } from './interface/walletTransactionCreditRepo.interface';
import { WalletTransactionCreditDto } from './dto/walletTransactionCredit.dto';
import { WalletTransactionCredit } from './entity/walletTransactionCredit.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { WalletTransactionCreditUpdateDto } from './dto/walletTransactionCreditUpdate.dto';
import { WalletTransactionCreditSearchDto } from './dto/walletTransactionCreditSearch.dto';
import { validResult } from 'src/utils/valid/result.valid';
import { IWalletTransactionService } from '../walletTransaction/interface/walletTransactionService.interface';
import { WalletTransaction } from '../walletTransaction/entity/walletTransaction.entity';
import { validCredit } from 'src/utils/valid/credit.valid';
import { creditInputValidation } from 'src/utils/valid/creditInput.valid';

@Injectable()
export class WalletTransactionCreditService {
  constructor(
    @Inject(IWalletTransactionCreditRepository)
    private readonly repository: IWalletTransactionCreditRepository,
    @Inject(IWalletTransactionService)
    private readonly walletTransactionService: IWalletTransactionService,
  ) {}
  public tableName: string = this.repository.tableName;

  async creditValidation(transactionId: number): Promise<number> {
    const walletTransaction: WalletTransaction[] | void =
      await this.walletTransactionService.findOneWalletTransaction(
        transactionId,
      );
    let credit: boolean;
    if (Array.isArray(walletTransaction) && walletTransaction.length > 0) {
      credit = walletTransaction[0].credit;
    }
    validCredit(credit, this.tableName);
    return walletTransaction[0].amount;
  }

  async postWalletTransactionCredit(
    body: WalletTransactionCreditDto,
  ): Promise<WalletTransactionCredit | void> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );

    creditInputValidation(data);
    data.amount = await this.creditValidation(data.transactionId);

    return await this.repository.postData(data);
  }

  async postWalletTransactionCreditWithTransaction(
    body: WalletTransactionCreditDto,
  ): Promise<WalletTransactionCredit> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );
    creditInputValidation(data);
    data.amount = await this.creditValidation(data.transactionId);

    return await this.repository.postDataWithTransaction(data);
  }
  async findAllWalletTransactionCredits(): Promise<WalletTransactionCredit[]> {
    return await this.repository.findAll();
  }
  async findOneWalletTransactionCredit(
    id: number,
  ): Promise<WalletTransactionCredit[] | void> {
    const findOption: FindOptionsWhere<WalletTransactionCredit> = { id: id };

    const result: WalletTransactionCredit[] =
      await this.repository.findById(findOption);

    return validResult<WalletTransactionCredit[]>(result, this.tableName);
  }
  async updateWalletTransactionCredit(
    id: number,
    body: WalletTransactionCreditUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );
    if (data.transactionId) {
      data.amount = await this.creditValidation(data.transactionId);
    }
    const findOption: FindOptionsWhere<WalletTransactionCredit> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateWalletTransactionCreditWithTransaction(
    id: number,
    body: WalletTransactionCreditUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );
    if (data.transactionId) {
      data.amount = await this.creditValidation(data.transactionId);
    }
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      WalletTransactionCredit,
    );
  }
  async deleteWalletTransactionCredit(id: number): Promise<DeleteResult> {
    return await this.repository.deleteWalletTransactionCredit(id);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletTransactionCreditSearchDto,
  ): Promise<WalletTransactionCredit[] | void> {
    const result = await this.repository.findWalletRelationsAndSearch(pattern);

    return validResult<WalletTransactionCredit[]>(result, this.tableName);
  }
}
