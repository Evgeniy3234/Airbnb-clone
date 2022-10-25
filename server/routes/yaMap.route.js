const route = require('express').Router();
const { Flat, Review, User } = require('../db/models');

route.post('/', async (req, res) => {
  try {
    const { id } = req.body;
    const flat = await Flat.findOne({ raw: true, where: { id } });
    const coordinats = flat.coordinates;
    const comments = await Review.findAll({ raw: true, where: { flatId: id }, include: User });
    res.json({ flat, coordinats, comments });
  } catch (error) {
    console.error('Error', error);
  }
});

module.exports = route;
