import {
    IsString,
    IsNumber,
    Min,
    Max,
    IsLongitude,
    IsLatitude,
    IsBoolean
    
} from 'class-validator';

import { Transform } from 'class-transformer';

 
 export class GetEstimateDto{
     @IsString()
     make:string;
 
     @IsString()
     model:string;
 
     @Transform( ({ value})=> parseInt(value))
     @IsNumber()
     @Min(1930)
     @Max(2023)
     year:number;
 
     // @IsNumber()
     // @Min(0)
     // @Max(100000)
     // mileage:number;
 
     @Transform( ({ value})=> parseFloat(value))
     @IsLongitude()
     lng:number;
  
     @Transform( ({ value})=> parseFloat(value))
     @IsLatitude()
     lat:number;
     
 
 
 }