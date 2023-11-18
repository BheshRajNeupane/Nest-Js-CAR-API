import { 
    Controller ,
     Post ,
     Body ,
     UseGuards,
     Patch,
     Param,
     Get,
     Query
     
     
     
    } from '@nestjs/common';
    
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service'
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/users.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard'
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Controller('reports')
export class ReportsController {
    constructor( 
             private reportsService: ReportsService
    ){}

    @Get('estimate')
    getEstimate(@Query() query:GetEstimateDto){
      return this.reportsService.createEstimate(query);
        
    }

    @Post()
    @UseGuards(AuthGuard)
    @Serialize(ReportDto)
    createReport(@Body() body:CreateReportDto , @CurrentUser() user:User){
      
        console.log(body);
        return this.reportsService.create(body , user);
    }

    @Patch('/:reportId')
    @UseGuards(AdminGuard)
    approveReport(@Param('reportId') id:string , @Body() body:ApproveReportDto){
        console.log("body");
        
     return this.reportsService.changeApproval(id , body.approved)
    }


}
