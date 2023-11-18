import { 
      AfterInsert, 
      AfterRemove,
      AfterUpdate,
     BeforeRemove, 
     Entity, 
     Column,
    PrimaryGeneratedColumn,
    OneToMany
    } from 'typeorm';

import { Report } from '../reports/reports.entity'
console.log("report" ,Report);

@Entity()
 export class User { 
    @PrimaryGeneratedColumn()
     id:number;

     @Column()
     email:string;

     @Column()
     password:string;
     
     @Column({default:true})
      admin:boolean;

     @OneToMany(()=> Report , report => report.user)
     reports:Report[];

     @AfterInsert()
     logInsert(){
         console.log("Inserted.!" , this.id);
         
     }
     @AfterUpdate()
     logUpdate(){
         console.log("Updated.!" , this.id);    
     }
     @BeforeRemove()
     @AfterRemove()
     logRemove(){
         console.log("Remove.!" , this.id);   
     }
}