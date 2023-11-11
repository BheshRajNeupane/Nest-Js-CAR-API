import { 
      AfterInsert, 
      AfterRemove,
      AfterUpdate,
     BeforeRemove, 
     Entity, 
     Column,
    PrimaryGeneratedColumn
    } from 'typeorm';



@Entity()
 export class User { 
    @PrimaryGeneratedColumn()
     id:number;

     @Column()
     email:string;

     @Column()
     password:string;

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