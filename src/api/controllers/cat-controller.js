import {
  addCat,
  findCatById,
  listAllCats,
  modifyCat,
  removeCat,
  findCatByOwner,
} from '../models/cat-model.js';

const getCats = async (req, res) => {
  res.json(await listAllCats());
};

const getCatByOwner = async (req, res) => {
  const catByOwner = await findCatByOwner(req.params.id);
  if (catByOwner) {
    res.json(catByOwner);
  } else {
    res.sendStatus(404);
    console.log('erroria');
  }
};

const getCatById = async (req, res) => {
  const cat = findCatById(req.params.id);
  if (cat) {
    res.json(await cat);
  } else {
    res.sendStatus(404);
  }
};

// req.body.filename = req.file.filename, routerista add thumbnail takas
const postCat = async (req, res) => {
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const result = await modifyCat(req.body, req.params.id);
  if (result) {
    res.sendStatus(200);
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(req.params.id);
  if (result) {
    res.sendStatus(200);
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat, getCatByOwner};
