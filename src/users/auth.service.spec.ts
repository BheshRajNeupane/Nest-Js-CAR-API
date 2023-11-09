import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { User} from './users.entity'
import { BadRequestException , NotFoundException } from '@nestjs/common';

describe('AuthService' , ()=>{
     
 let service:AuthService;
  let fakeUsersService: Partial<UsersService> ;
 beforeEach( async ()=> {
     const users:User[]=[];

         fakeUsersService = {
            // find:()=>Promise.resolve([]),
            find:(email:string )=>{
                const filterUsers = users.filter(user =>user.email === email);
                return Promise.resolve(filterUsers);
            },
            create:(email :string, password:string) => {
                //Promise.resolve({id:1 ,email,password} as User ),
                const user = {id: Math.floor(Math.random()*999),email,password} as User;
                users.push(user);
                return  Promise.resolve(user);
            }
        }

        const module = await Test.createTestingModule({
        providers:[ 
            AuthService,
            {
                provide:UsersService,
                useValue:fakeUsersService
            }
        ]
        }).compile(); 

        service = module.get(AuthService) 

     })
        it(' can create an instance of auth service' ,  async ()=>{

            expect(service).toBeDefined();
        } )
        it(' creates a new user with a salted and hashed password' ,  async ()=>{
            const user = await service.signup('fake@gmail.com' , 'fakepass123');
            // Ensuring Password Gets Hashed
            expect(user.password).not.toEqual('fakepass123');
            const [ salt , hash ] = user.password.split('.');
            expect(salt).toBeDefined();
            expect(hash).toBeDefined();
        } )
    
        it('throws an error if user signs up with email that is in use', async () => {
            fakeUsersService.find = () =>
              Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
              await expect(service.signup('fake@gmail.com', 'fakepass123')).rejects.toThrow(
              BadRequestException,
              ); 
            }); 

       it('throws if signin is called with an unused email' , async()=>{
           await expect(
               service.signin('fake@gmail.com', 'fakepass123'),
           ).rejects.toThrow(NotFoundException)
       })     
        
  
    
    it('throws if an invalid password is provided', async () => {
        fakeUsersService.find = () =>
        Promise.resolve([
            { email: 'adfdff@fj.com', password: 'fsdgafq13' } as User,
        ]);
        await expect(
            service.signin('laskdjf@alskdfj.com', 'passowrd'),
            ).rejects.toThrow(BadRequestException);
        });

// Or, if service.signin returns a result directly
// it('should return an error for invalid credentials', () => {
//     const result = service.signin('laskdjf@alskdfj.com', 'password');
//     expect(result).toEqual('Some Expected Error Message');



  it('returns a user if correct password is provided' , async()=>{
      await service.signup('adfdff@fj.com' , 'mypassword');
      const user = await service.signin('adfdff@fj.com', 'mypassword');
      expect(user).toBeDefined();
  })


  it('throws an error if user signs up with email that is in use', async () => {
    await service.signup('asdf@asdf.com', 'asdf');
    await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(
      BadRequestException,
    );
  });

        
    })