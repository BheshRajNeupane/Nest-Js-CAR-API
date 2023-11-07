import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm'
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './users.entity';
import { AuthService } from './auth.service';


@Module({
  imports:[TypeOrmModule.forFeature([User])],//this creates a repository
  controllers: [UsersController],
  providers: [UsersService,AuthService]
})
export class UsersModule {}
