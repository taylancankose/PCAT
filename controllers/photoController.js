const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1; // bulunduğumuz sayfa url'de /?page=4 yazıyorsa 4 hiçbir şey yazmıyorsa 1'dir
  const photosPerPage = 3;

  const totalPhotos = await Photo.find().countDocuments(); // react'daki .length gibi düşün db'deki total dosya sayısını sayıyor

  console.log(req.query);
  /* DB'ye yolladığımız fotoları ve veriyi index'e dinamik olarak yollamak için */
  const photos = await Photo.find({})
    .sort('-dateCreated') // db'deki tüm fotolar. Find methodu ile sıralıyoruz
    .skip((page - 1) * photosPerPage) // Her sayfada 2 eleman gösterecek ÖRN: 3.sf'deyiz (3-1)*2 = 4 eleman geçecek yani 3. sayfada 5. ve 6. elemanı gösterecek!
    .limit(photosPerPage); // 2 tane göstermek istiyoruz bu yüzden limit
  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage), // 5/2 = 2.5 bunu 3'e yuvarlattık hep üste yuvarlarız!
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo /* db deki spesifik foto */,
  });
};

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads';

  // burada public dosyasının içine uploads dosyasını oluşturuyoruz
  // Sync ibaresi ile neden yapıldı? Çünkü dosayayı önceden oluşturmasını istiyoruz
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  // upload photo
  let uploadImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadImage.name; // public klasöründe uploads diye bir yer oluşturmak ve yüklediğimiz resimleri oraya atmak istiyoruz

  uploadImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  await photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  let deleteImage = __dirname + '/../public' + photo.image;
  fs.unlinkSync(deleteImage);
  await Photo.findByIdAndRemove(req.params.id);
  res.redirect('/');
};
