import sharp from 'sharp';

const createThumbnail = async (req, res, next) => {
  console.log('todo: tee kuvankäsittely', req.file);
  if (!req.file) {
    next('Kuvaa ei löydy');
    return;
  }

  let extension = 'jpg';
  if (req.file.mimetype === 'image/png') {
    extension = 'png';
  }

  await sharp(req.file.path)
    .resize(100, 100)
    .toFile(`${req.file.path}_thumb.${extension}`);

  next();
};

export default createThumbnail;
