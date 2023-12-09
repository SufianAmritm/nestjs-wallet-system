/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { DeleteResult } from 'typeorm';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { Wallet } from '../wallet/entity/wallet.entity';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
  @Get()
  async findAllCities(): Promise<User[]> {
    return await this.userService.findAllCities();
  }
  @Post()
  async postUser(@Body() body: UserDto): Promise<any> {
    return await this.userService.postUser(body);
  }
  @Get('search')
  async findUserRelationsAndSearch(
    @Query() query: {},
  ): Promise<User[] | Wallet[]> {
    return await this.userService.findUserRelationsAndSearch(query, false);
  }
  @Get(':id')
  async findOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User[] | void> {
    return await this.userService.findOneUser(id);
  }
  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, body);
  }
  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }
}
