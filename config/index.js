const path = require('path');

const port = 8080;
module.exports = {
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASSWORD: '',
  DB_NAME: 'cpts',

  PORT: port,

  HTTP_ROOT: `http://localhost:${port}`,

  UPLOAD_DIR: path.resolve(__dirname, '../static/upload'),
}