import {addUser, findUserById, listAllUsers} from '../models/user-model.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

const deleteUser = (req, res) => {
  // not implemented in this example, this is future homework
  res.sendStatus(200);
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
