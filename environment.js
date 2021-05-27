const fs = require('fs');

const heroku = `export const environment = {
    production: true,
    NZESPORTES_API: '${process.env.NZESPORTES_API}',
    TOKEN_HASH_KEY: '${process.env.TOKEN_HASH_KEY}',
    USER_HASH_KEY: '${process.env.USER_HASH_KEY}'
};`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
  if (err) {
    console.log('Falha ao escrever arquivo');
  }
});
