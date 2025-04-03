import express from 'express';
import {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} from '../controllers/user-controller.js';
import {authenticateToken, checkUser} from '../../middlewares.js';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUser);

userRouter
  .route('/:id')
  .get(getUserById)
  .put(authenticateToken, checkUser, putUser)
  .delete(authenticateToken, checkUser, deleteUser);

export default userRouter;
