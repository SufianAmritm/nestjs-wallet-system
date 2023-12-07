import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/common/database/rep/base.repository';
import { City } from '../entity/city.entity';
import { ICityRepository } from '../interface/cityRep.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityRepository
  extends BaseRepository<City>
  implements ICityRepository
{
  constructor(
    @InjectRepository(City) protected readonly repository: Repository<City>,
  ) {
    super(repository);
  }
}
