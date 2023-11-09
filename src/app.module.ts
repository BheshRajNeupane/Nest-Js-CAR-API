import { Module, ValidationPipe  , MiddlewareConsumer} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule} from '@nestjs/typeorm'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/users.entity';
import { Report } from './reports/reports.entity';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db.sqlite',
    entities:[User,Report],
    synchronize:true, 
    }) ,
   UsersModule,
   ReportsModule
],
  controllers: [AppController],
  providers: [
      AppService,
      {
        provide : APP_PIPE,                // 2
        useValue :  new ValidationPipe({
          whitelist:true
        })
      },
  ],
})

export class AppModule {
    configure(consumer :  MiddlewareConsumer ){  //       2
      consumer
      .apply(
         cookieSession({
           keys:['adfdfdgd'],
         }),
      ).forRoutes('*');
    }
}
