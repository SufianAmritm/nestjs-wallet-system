/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';
import { IWalletRepository } from './interface/walletRepo.interface';
import { WalletDto } from './dto/wallet.dto';
import { Wallet } from './entity/wallet.entity';
import { plainToClass } from 'class-transformer';
import { DeleteResult, FindOptionsWhere, UpdateResult } from 'typeorm';
import { MESSAGE } from 'src/common/customMessages';
import { WalletUpdateDto } from './dto/walletUpdate.dto';
import { WalletSearchDto } from './dto/walletSearch.dto';
import { IWalletService } from './interface/walletService.interface';
import { resultValid } from 'src/utils/valid/result.valid';
import { patternValid } from 'src/utils/valid/pattern.valid';

@Injectable()
export class WalletService implements IWalletService {
  constructor(
    @Inject(IWalletRepository) private readonly repository: IWalletRepository,
  ) {}
  public readonly tableName: string = this.repository.tableName;
  async postWallet(body: WalletDto): Promise<Wallet | void> {
    const data: Wallet = plainToClass(Wallet, body);
    return await this.repository.postData(data);
  }

  async postWalletWithTransaction(body: WalletDto): Promise<Wallet> {
    const data: Wallet = plainToClass(Wallet, body);
    return await this.repository.postDataWithTransaction(data);
  }
  async findAllWallets(): Promise<Wallet[]> {
    return await this.repository.findAll();
  }
  async findOneWallet(id: number): Promise<Wallet[] | void> {
    const findOption: FindOptionsWhere<Wallet> = { id: id };
    const result: Wallet[] = await this.repository.findById(findOption);
    return resultValid<Wallet[]>(result, this.tableName);
  }
  async updateWallet(id: number, body: WalletUpdateDto): Promise<UpdateResult> {
    const data: Wallet = plainToClass(Wallet, body);
    const findOption: FindOptionsWhere<Wallet> = { id: id };
    return await this.repository.updateById(findOption, data);
  }
  async updateWalletWithTransaction(
    id: number,
    body: WalletUpdateDto,
  ): Promise<UpdateResult> {
    const data: Wallet = plainToClass(Wallet, body);
    return await this.repository.updateByIdWithTransaction(id, data, Wallet);
  }
  async deleteWallet(id: number): Promise<DeleteResult> {
    return await this.repository.deleteWallet(id);
  }
  async findWalletRelationsAndSearch(
    pattern: WalletSearchDto,
  ): Promise<Wallet[] | void> {
    patternValid<WalletSearchDto>(pattern, this.tableName);

    const result = await this.repository.findWalletRelationsAndSearch(pattern);
    return resultValid<Wallet[]>(result, this.tableName);
  }
}
