import express from 'express';
import {
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCats,
  getCatByOwner,
} from '../controllers/cat-controller.js';
import multer from 'multer';
import {
  authenticateToken,
  checkCatOwner,
  createThumbnail,
} from '../../middlewares.js';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});

catRouter
  .route('/')
  .get(getCats)
  .post(upload.single('file'), createThumbnail, postCat);

catRouter
  .route('/:id')
  .get(getCatById)
  .put(authenticateToken, checkCatOwner, putCat)
  .delete(authenticateToken, checkCatOwner, deleteCat);

catRouter.route('/owner/:id').get(getCatByOwner);

export default catRouter;
