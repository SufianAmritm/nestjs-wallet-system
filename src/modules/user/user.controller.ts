/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { DeleteResult } from 'typeorm';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserCsvDto } from './dto/usercsv.dto';
import { FileExtensionTypeValidator } from './pipe/file.valid.pipe';
import { MESSAGE, OPERATION } from 'src/common/customMessages';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private readonly userService: UserService) {}
  private findAllRelations: boolean;
  private findWallet: boolean;
  private findCoins: boolean;
  @Get()
  async findAllCities(): Promise<User[]> {
    return await this.userService.findAllCities();
  }
  @Post()
  async postUser(@Body() body: UserDto): Promise<any> {
    return await this.userService.postUser(body);
  }
  @Get('search')
  async userSearch(@Query() query: {}): Promise<User[] | void> {
    this.findAllRelations = false;
    this.findWallet = false;
    this.findCoins = false;
    return await this.userService.findUserRelationsAndSearch(
      query,
      this.findAllRelations,
      this.findWallet,
      this.findCoins,
    );
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
  @Get('wallets/:id')
  async findWalletsByUserId(@Query() query: {}): Promise<User[] | void> {
    this.findAllRelations = false;
    this.findWallet = true;
    this.findCoins = false;
    return await this.userService.findUserRelationsAndSearch(
      query,
      this.findAllRelations,
      this.findWallet,
      this.findCoins,
    );
  }
  @Get('coins/:id')
  async findCoinsByUserId(@Query() query: {}): Promise<User[] | void> {
    this.findAllRelations = false;
    this.findWallet = false;
    this.findCoins = true;
    return await this.userService.findUserRelationsAndSearch(
      query,
      this.findAllRelations,
      this.findWallet,
      this.findCoins,
    );
  }
  @Post('usercsv')
  @UseInterceptors(FileInterceptor('data'))
  async postUserCsv(
    @Body() operation: UserCsvDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 100,
            message: MESSAGE.INVALID_FILE_SIZE,
          }),
        ],
      }),
      FileExtensionTypeValidator,
    )
    file: Express.Multer.File,
  ) {
    const originalOperation: string = operation.operation;
    const result = await this.userService.postUserCsv(file, originalOperation);
    return originalOperation === OPERATION.ADD
      ? result
      : result.length === 0
        ? MESSAGE.USER_CSV_INVALID_IDS
        : result;
  }
}
