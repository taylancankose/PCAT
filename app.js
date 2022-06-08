const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoController = require('./controllers/photoController');
const pageController = require('./controllers/pageController');

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

/* MIDDLEWARES */
/* MIDDLEWARE: NODEJS temelde bir request gönderir ve ona yönelik bir response alır. Yani request-response cycle
 Req-res arasındaki yere middle denir */
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // bu ve altındaki middleware req-res döngüsünü sonlandırmamızı sağladı
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

// ROUTES
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto); // tıkladığım spesifik fotoyu buluyor
app.post('/photos', photoController.createPhoto); // UPLOAD A PHOTO
app.put('/photos/:id', photoController.updatePhoto); // edit a photo title and desc
app.delete('/photos/:id', photoController.deletePhoto); // delete a photo

/* Pages */
app.get('/photos/edit/:id', pageController.getEditPage); // update details'e tıkladığım fotonun edit sayfasına yönlendiriyor
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);

const port = 3000;
app.listen(port, (err) => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
