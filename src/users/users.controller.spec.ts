import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService} from './users.service';
import { AuthService } from './auth.service';
import { User } from './users.entity';
import { NotFoundException } from '@nestjs/common';


describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
       findOne: ( id:number)=>{
          return Promise.resolve({id , email:'ram@gmail.com' , password:'mypassword'} as User)
       },
       find: ( email: string ) => {
            return Promise.resolve([{ id:1 , email , password:'rsfsdsdfds'} as User])
       },
      //  remove : ()=>{},
      //  update :()=>{}
    };
    fakeAuthService = {
      // signup: ()=>{},
       signin: ( email:string , password:string )=>{
          return Promise.resolve({ id:12 ,email , password } as User)
       }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers:[
          {
            provide : UsersService,
            useValue : fakeUsersService
          },
          {
            provide :  AuthService,
            useValue : fakeAuthService
          },
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it(' UserController should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found' , async ()=>{

    fakeUsersService.findOne = () => null;
    await expect(controller.findUser('1')).rejects.toThrow(NotFoundException);

  })

 it('sigin updates session object and returns user' , async()=>{
     const session = { userId : -1000};
     const user = await controller.signin(
          { email:'ram@gmail.com' , password:'mypassword' },
          session
          );
          expect(user.id).toEqual(12);
          expect(session.userId).toEqual(12);
  })

});
