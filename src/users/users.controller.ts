import {
     Body, 
     Controller ,
     Delete,
      Get,
      Patch,
      Param, 
      Post ,
      Query,
      NotFoundException,
      Session,
      UseInterceptors,
      UseGuards
 } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

import { CurrentUser } from './decorators/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User}  from './users.entity'
import { AuthGuard } from '../guards/auth.guard';


@Controller('auth')
@Serialize( UserDto)
// @UseInterceptors(CurrentUserInterceptor) Local Scoped Interceptor
export class UsersController {
    constructor(
          private usersService : UsersService,
          private authService:AuthService  
     ){}

     // @Get('/whoami')//current signed in user
     // @UseGuards(AuthGuard)
     // whoAmI(@Session() session:any){
     //  return this.usersService.findOne(session.userId)
     // }
     @Get('/whoami')//current signed in user
     @UseGuards(AuthGuard)
     whoAmI(@CurrentUser() user:User){
        return user;
     }

     @Post('/signout')
     @UseGuards(AuthGuard)
     signOut(@Session() session:any
     ){
          session.userId= null;
     }

    @Post('/signup')
     async createUser(@Body() body:CreateUserDto , @Session() session:any){ 
       const user = await this.authService.signup(body.email , body.password);
      session.userId = user.id;
      return user;
    }

    @Post('/signin')
     async signin(@Body() body:CreateUserDto , @Session() session : any){      
         const user = await this.authService.signin(body.email , body.password);
         session.userId = user.id;
         return user;
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
     async findUser( @Param('id') id:string){
          const user =  await this.usersService.findOne(parseInt(id));
          
          if(!user){
               throw  new NotFoundException('User not found !');
           }
           return user;
    }
    @Get()
    @UseGuards(AuthGuard)
    findAllUsers( @Query('email') email:string){
         return this.usersService.find(email);
    }

    @Patch('/:id')
    @UseGuards(AuthGuard)
     updateUser( @Param('id') id:string , @Body()   body: UpdateUserDto ){
           
          return this.usersService.update( parseInt(id) , body)
     }

    @Delete('/:id')
    @UseGuards(AuthGuard)
     removeUser( @Param('id') id:string){
          return this.usersService.remove(parseInt(id));
     }
}
