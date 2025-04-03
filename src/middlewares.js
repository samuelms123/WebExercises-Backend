import sharp from 'sharp';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import {findCatById} from './api/models/cat-model.js';

const checkUser = (req, res, next) => {
  const role = res.locals.user.role;
  const localId = res.locals.user.user_id;

  if (role === 'admin') {
    return next();
  }

  if (localId != req.params.id) {
    return res.status(403).send({message: 'Unauthorized!'});
  }

  next();
};

const checkCatOwner = async (req, res, next) => {
  try {
    const cat = await findCatById(req.params.id);
    console.log('CAT :', cat);
    console.log('USER ID FROM LOCALS', res.locals.user.user_id);

    if (!cat) {
      return res.status(404).send({message: 'Cat not found'});
    }

    if (cat.owner == res.locals.user.user_id) {
      next();
    } else {
      return res
        .status(403)
        .send({message: 'Unauthorized: You are not the owner of this cat'});
    }
  } catch (err) {
    return res.status(404).send({message: 'Something went wrong'});
  }
};

const createThumbnail = async (req, res, next) => {
  console.log(req.file);
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

const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(403).send({message: 'invalid token'});
  }
};

export {createThumbnail, authenticateToken, checkCatOwner, checkUser};
