import { Inject, Injectable } from '@nestjs/common';
import { IWalletTransactionReasonRepository } from './interface/walletTransactionReasonRepo.interface';
import { WalletTransactionReasonDto } from './dto/walletTransactionReason.dto';
import { WalletTransactionReason } from './entity/walletTransactionReason.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { WalletTransactionReasonUpdateDto } from './dto/walletTransactionReasonUpdate.dto';
import { WalletTransactionReasonSearchDto } from './dto/walletTransactionReasonSearch.dto';

import { validResult } from 'src/utils/valid/result.valid';
import { validPattern } from 'src/utils/valid/pattern.valid';

@Injectable()
export class WalletTransactionReasonService {
  constructor(
    @Inject(IWalletTransactionReasonRepository)
    private readonly repository: IWalletTransactionReasonRepository,
  ) {}
  public readonly tableName: string = this.repository.tableName;
  async postWalletTransactionReason(
    body: WalletTransactionReasonDto,
  ): Promise<WalletTransactionReason | void> {
    const data: WalletTransactionReason = plainToClass(
      WalletTransactionReason,
      body,
    );
    return await this.repository.postData(data);
  }

  async postWalletTransactionReasonWithTransaction(
    body: WalletTransactionReasonDto,
  ): Promise<WalletTransactionReason> {
    const data: WalletTransactionReason = plainToClass(
      WalletTransactionReason,
      body,
    );
    return await this.repository.postDataWithTransaction(data);
  }
  async findAll(): Promise<WalletTransactionReason[]> {
    return await this.repository.findAll();
  }
  async findOneWalletTransactionReason(
    id: number,
  ): Promise<WalletTransactionReason[] | void> {
    const findOption: FindOptionsWhere<WalletTransactionReason> = { id: id };
    const result: WalletTransactionReason[] =
      await this.repository.findById(findOption);
    return validResult<WalletTransactionReason[]>(result, this.tableName);
  }
  async updateWalletTransactionReason(
    id: number,
    body: WalletTransactionReasonUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionReason = plainToClass(
      WalletTransactionReason,
      body,
    );
    const findOption: FindOptionsWhere<WalletTransactionReason> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateWalletTransactionReasonWithTransaction(
    id: number,
    body: WalletTransactionReasonUpdateDto,
  ): Promise<UpdateResult> {
    const data: WalletTransactionReason = plainToClass(
      WalletTransactionReason,
      body,
    );
    return await this.repository.updateByIdWithTransaction(
      id,
      data,
      WalletTransactionReason,
    );
  }
  async deleteWalletTransactionReason(id: number): Promise<DeleteResult> {
    return await this.repository.deleteWalletTransactionReason(id);
  }

  async findWalletTransactionReasonRelationsAndSearch(
    pattern: WalletTransactionReasonSearchDto,
  ): Promise<WalletTransactionReason[]> {
    validPattern<WalletTransactionReasonSearchDto>(pattern, this.tableName);

    const result =
      await this.repository.findWalletTransactionReasonRelationsAndSearch(
        pattern,
      );
    return validResult<WalletTransactionReason[]>(result, this.tableName);
  }
}
