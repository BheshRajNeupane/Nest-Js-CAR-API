import { rm } from 'fs/promises';
import { join } from 'path';

global.beforeEach(async ()=>{
    try{
        console.log("rm", rm);
        const result = await rm(join(__dirname ,'..' , 'test.sqlite'));
        console.log("result", result);
        
    }catch(err){}

})