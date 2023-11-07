// commuunicate with current-userdecorator to access (usrService)Dependecy injection indirectly
import { UsersService } from '../users.service';

import{ 
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Injectable
 }from '@nestjs/common';


 @Injectable()
 export class CurrentUserInterceptor implements NestInterceptor{
     constructor( private usersService:UsersService){}

     async intercept(context:ExecutionContext , handler:CallHandler){
      const request = context.switchToHttp().getRequest();
      const { userId } = request.session || {};
 
      if(userId){
          const user = await this.usersService.findOne(userId)
        request.curentUser = user;
      }

    return handler.handle();
     }

 }