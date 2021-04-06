const fs = require('fs');

const heroku = `export const environment = {
    production: true,
    api: '${process.env.NZESPORTES_API}'
};`

fs.writeFile('src/environments/environment.prod.ts', heroku, (err, result) => {
  if (err) {
    console.log('Falha ao escrever arquivo');
  }
});
