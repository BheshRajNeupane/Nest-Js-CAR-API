//report response 

import { Expose , Transform } from 'class-transformer';
import { User } from '../../users/users.entity';
import { Report } from '../reports.entity';



export class ReportDto{
    @Expose()
    id:number;

    @Expose()
    price:number;

    @Expose()
    year:number;

    @Expose()
    model:string;

    @Expose()
    lng:number;

    @Expose()
    lat:number;

    // @Expose()
    // mileage: number;
   
    @Expose()
    approved:boolean;

    //@Transform(({ obj } )=> obj.user.id)
    @Transform(({ obj } )=> obj.user ? obj.user.id : undefined)
    @Expose()
    userId:number;
}