import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { IUserRepository } from './interface/userRepo.interface';
import { UserRepository } from './repository/user.repository';
import { IUserService } from './interface/userService.interface';
import { WalletModule } from '../wallet/wallet.module';

const userRepositoryProvider = [
  { provide: IUserRepository, useClass: UserRepository },
];
const userServiceProvider = [
  {
    provide: IUserService,
    useClass: UserService,
  },
];
@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule],
  controllers: [UserController],
  providers: [UserService, ...userRepositoryProvider, ...userServiceProvider],
  exports: [...userRepositoryProvider, ...userServiceProvider],
})
export class UserModule {}
