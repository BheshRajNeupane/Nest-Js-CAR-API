import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm'
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';


@Module({
  imports:[TypeOrmModule.forFeature([User])],//this creates a repository
  controllers: [UsersController],
  providers: [ 
          UsersService, 
          AuthService ,
          {//Gobally Scoped Interceptor
            provide:APP_INTERCEPTOR,
             useClass:sCurrentUserInterceptor
          }
         ]
})
export class UsersModule {}
