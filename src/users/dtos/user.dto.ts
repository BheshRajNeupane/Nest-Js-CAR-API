//describe how to serialize a user 

import {
     Expose

} from 'class-transformer';


export class UserDto{
    @Expose()
    id:number;

    @Expose()
    email:string;
}