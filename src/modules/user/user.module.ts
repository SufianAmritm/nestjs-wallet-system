import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { IUserRepository } from './interface/userRepo.interface';
import { UserRepository } from './repository/user.repository';

const userRepositoryProvider = [
  { provide: IUserRepository, useClass: UserRepository },
];

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ...userRepositoryProvider],
})
export class UserModule {}
