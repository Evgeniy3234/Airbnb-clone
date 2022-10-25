const route = require('express').Router();
const { Flat, Review, User } = require('../db/models');

route.post('/owner', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.body.owner },
      raw: true,
    });
    res.json({ user });
  } catch (error) {
    console.error('Error', error);
  }
});

route.post('/:id', async (req, res) => {
  try {
    const flat = await Flat.findByPk(req.body.id);
    const review = await Review.findAll({
      raw: true,
      where: { flatId: req.body.id },
    });
    const jsonFlat = flat.toJSON();
    res.json({ jsonFlat, review });
  } catch (error) {
    console.error('Error', error);
  }
});

module.exports = route;
