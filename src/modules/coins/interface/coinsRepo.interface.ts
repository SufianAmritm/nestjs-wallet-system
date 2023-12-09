import { BaseRepository } from 'src/common/database/rep/base.repository';
import { Coins } from '../entity/coins.entity';
import { DeleteResult } from 'typeorm';
import { CoinsSearchDto } from '../dto/coinsSearch.dto';
export const ICoinsRepository = Symbol('ICoinsRepository');
export interface ICoinsRepository extends BaseRepository<Coins> {
  deleteCoins(id: number): Promise<DeleteResult>;
  findCoinsRelationsAndSearch(pattern: CoinsSearchDto): Promise<Coins[]>;
}
