//159

// module.exports = {
//     type:'sqlite',
//     database:'db.sqlite',
//     entities: 
//          process.env.NODE_ENV === 'development' ? ['**/*.entity.js'] : ['**/*.entity.ts'],
//          synchronize:false
// }

// tsconfig 
// "allowJs":true


var dbConfig = {
    synchronize:false,
    migrations:['migrations/*.js'],
    cli:{
        migrationsDir:'migrations',
    }
};



switch(process.env.NODE_ENV){
    case 'development':
        Object.assign(dbConfig , {
            type:'sqlite',
            database:'db.sqlite',
            entities:['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbConfig , {
            type:'sqlite',
            database:'test.sqlite',
            entities:['**/*.entity.ts'],
        });
        break;
    case 'production':
        break;

     default:
        throw new Error('Unkonwn environment')   
}
module.exports = dbConfig;