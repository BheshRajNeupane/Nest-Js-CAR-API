import {
   IsString,
   IsNumber,
   Min,
   Max,
   IsLongitude,
   IsLatitude,
   IsBoolean

} from 'class-validator';


export class CreateReportDto{
    @IsString()
    make:string;

    @IsString()
    model:string;

    @IsNumber()
    @Min(1930)
    @Max(2023)
    year:number;

    // @IsNumber()
    // @Min(0)
    // @Max(100000)
    // mileage:number;

    @IsLongitude()
    lng:number;
 
    @IsLatitude()
    lat:number;
    
    @IsNumber()
    @Min(0)
    @Max(100000)
    price:number;


}