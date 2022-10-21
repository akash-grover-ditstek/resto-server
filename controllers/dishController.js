const { DishModel, validate } = require('../models/dishModel');

// create
module.exports.addDish = async (req, res) => {
  const file = req.files.image;
  const newImg = file.data;
  const encImg = newImg.toString('base64');
  const image = {
    contentType: file.mimetype,
    // size: file.size,
    // img: Buffer.from(encImg, 'base64')
  };
  const { value, error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  value.image = image;
  const dish = new DishModel(value);
  try {
    const result = await dish.save();

    res.send({ msg: 'successfully added', result });
  } catch (err) {
    const error = [];
    for (field in err.errors) {
      error.push(err.errors[field].message);
    }
    res.send(error);
  }
}

// get
module.exports.fetchAllDishes = async (req, res) => {
  const skip = req.query.skip;
  const limit = req.query.limit;
  const result = await DishModel.find({}).limit(parseInt(limit)).skip(parseInt(skip));
  res.send(result);
}

// get
module.exports.fetchAllDishesOnce = async (req, res) => {
  const result = await DishModel.find({}).select({ image: 0 });
  res.send(result);
}

// delete
module.exports.deleteDish = async (req, res) => {
  const id = req.params.id;
  const result = await DishModel.findByIdAndDelete(id);
  if (!result) return res.status(404).send({ msg: `not found` });
  res.send({ id, msg: `successfully deleted ${result.name} dish` });
}

// update dish price
module.exports.updateDishPrice = async (req, res) => {
  const id = req.params.id;
  const { price } = req.body;
  const attributes = {
    price
  }

  const result = await DishModel.findByIdAndUpdate(id, attributes, { new: true });
  return res.status(200).send(result)
}
