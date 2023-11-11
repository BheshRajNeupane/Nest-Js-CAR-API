import { Module, ValidationPipe  , MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule , ConfigService} from '@nestjs/config'
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
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config:ConfigService)=>{
         return {
            type:'sqlite',
            database: config.get<any>('DB_NAME'),
            synchronize: true,
            entites:[User , Report],
         }
      }
    }),
    // TypeOrmModule.forRoot({
    // type:'sqlite',
    // database:'db.sqlite',
    // entities:[User,Report],
    // synchronize:true, 
    // }) ,
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
