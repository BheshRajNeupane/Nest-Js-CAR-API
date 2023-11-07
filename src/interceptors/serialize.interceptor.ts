import{ 
   UseInterceptors,
   NestInterceptor,
   ExecutionContext,
   CallHandler
}from '@nestjs/common';

import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor{
    new(...args:any[]):{}
}

export function Serialize( dto:ClassConstructor){
    return UseInterceptors(
        new SerializeInterceptor(dto)
        )
}


export class SerializeInterceptor implements NestInterceptor{
     constructor( private dto:ClassConstructor){}
 intercept( context : ExecutionContext , handler : CallHandler) : Observable<any>
{
     //Run something before the request is handled
   

     return handler.handle().pipe(
        //Run something before the response is sent out
        map((data:ClassConstructor) =>{
            return plainToClass(this.dto,data , {
                excludeExtraneousValues: true,
            } )   
        })
    )
}

}