const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// create schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);
// burada yazan 'Photos'u mongoose alıp küçültüp 's' takısı ekleyerek collection oluşturuyor. => photos
// string ve schema bilgisini baz alarak yeni bir model oluşturuyor

// create a photo
// Photo.create({
//   title: 'Photo Title 6',
//   description: 'Photo desc 6',
// });

// read a photo
// Photo.find({}, (err, data) => {
//   console.log(data);
// });

// update a photo
// const id = '629f5e98009c0e87d4aa5504';

// Photo.findByIdAndUpdate(
//   id,
//   {
//     title: 'Photo of Teco 666',
//     description: 'Photo desc 666',
//   },
//   {
//     new: true,
//   },
//   (err, data) => {
//     console.log(data);
//   }
// );

// delete a photo
const id = '629f4ba16208fe5ff071f2d0';
Photo.findByIdAndDelete(id, (err, data) => {
  console.log('Photo is removed');
});
