import { Repository } from 'typeorm';

export class BaseRepository<T> {
  private tableName: string;
  constructor(protected readonly repository: Repository<T>) {
    this.tableName = this.repository.metadata.tableName;
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
}
