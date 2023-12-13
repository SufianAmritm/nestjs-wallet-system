import { UpdateResult } from 'typeorm';
import { CoinsUpdateDto } from '../dto/coinsUpdate.dto';
import { Coins } from '../entity/coins.entity';
export const ICoinsService = Symbol('ICoinsService');

export interface ICoinsService {
  findOneCoins(id: number): Promise<Coins[] | void>;

  updateCoinsWithTransaction(
    id: number,
    coins: CoinsUpdateDto,
  ): Promise<UpdateResult>;
}
