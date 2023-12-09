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
import { resultValid } from 'src/utils/valid/result.valid';
import { patternValid } from 'src/utils/valid/pattern.valid';

@Injectable()
export class WalletTransactionCreditService {
  constructor(
    @Inject(IWalletTransactionCreditRepository)
    private readonly repository: IWalletTransactionCreditRepository,
  ) {}
  public tableName: string = this.repository.tableName;
  async postWalletTransactionCredit(
    body: WalletTransactionCreditDto,
  ): Promise<WalletTransactionCredit | void> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );

    return await this.repository.postData(data);
  }

  async postWalletTransactionCreditWithTransaction(
    body: WalletTransactionCreditDto,
  ): Promise<WalletTransactionCredit> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );

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

    return resultValid<WalletTransactionCredit[]>(result, this.tableName);
  }
  async updateWalletTransactionCredit(
    id: number,
    body: WalletTransactionCreditUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionCredit = plainToClass(
      WalletTransactionCredit,
      body,
    );
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
    patternValid<WalletTransactionCreditSearchDto>(pattern, this.tableName);

    const result = await this.repository.findWalletRelationsAndSearch(pattern);
    console.log(result);
    return resultValid<WalletTransactionCredit[]>(result, this.tableName);
  }
}
