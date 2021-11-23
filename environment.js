const fs = require('fs');

const heroku = `export const environment = {
    production: true,
    NZESPORTES_API: '${process.env.NZESPORTES_API}',
    TOKEN_HASH_KEY: '${process.env.TOKEN_HASH_KEY}',
    USER_HASH_KEY: '${process.env.USER_HASH_KEY}',
    ME_CLIENT_ID: '${process.env.ME_CLIENT_ID}',
    ME_CLIENT_SECRET: '${process.env.ME_CLIENT_SECRET}',
    ME_SANDBOX: '${process.env.ME_SANDBOX}',
    ME_TOKEN: '${process.env.ME_TOKEN}',
    ME_REDIRECT_URI: '${process.env.ME_REDIRECT_URI}',
    ME_REQUEST_SCOPE: '${process.env.ME_REQUEST_SCOPE}',
    ME_STATE: '${process.env.ME_STATE}',
    ME_URL: '${process.env.ME_URL}',
    URL_FRONT: '${process.env.URL_FRONT}',
    ME_CEP_NZ: '${process.env.ME_CEP_NZ}'
};`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
  if (err) {
    console.log('Falha ao escrever arquivo');
  }
});
