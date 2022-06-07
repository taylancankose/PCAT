const express = require('express');
const path = require('path');

const app = express();

/* MIDDLEWARE: NODEJS temelde bir request gönderir ve ona yönelik bir response alır. Yani request-response cycle
 Req-res arasındaki yere middle denir */

/* MIDDLEWARES */
const myLogger = (req, res, next) => {
  console.log('Middleware log 1');
  next(); /* bir sonraki middlewareye ilerlemesi için next'i çağırmamız lazım */
};
const myLogger2 = (req, res, next) => {
  console.log('Middleware log 2');
  next(); /* bir sonraki middlewareye ilerlemesi için next'i çağırmamız lazım */
};
/* MIDDLEWARES */

app.use(express.static('public'));
app.use(myLogger);
app.use(myLogger2);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, (err) => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
