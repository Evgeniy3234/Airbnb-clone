/* eslint-disable max-len */
const route = require('express').Router();

const {
  User, Flat, Favorite, Booking,
} = require('../db/models');

route.post('/', async (req, res) => {
  const { userId, id } = req.body;
  try {
    const flat = await Flat.findOne({ where: { id }, raw: true });
    if (flat) {
      const fav = await Favorite.create({ userId, flatId: Number(id) });
      res.json({ fav });
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('error in favorite in user', error);
  }
});
route.post('/delete', async (req, res) => {
  const { userId, id } = req.body;
  try {
    const flat = await Flat.findOne({ where: { id }, raw: true });
    if (flat) {
      await Favorite.destroy({ where: { userId, flatId: Number(id) } });
      res.send('deleted');
    } else {
      res.json({});
    }
  } catch (error) {
    console.error('error in favorite in user', error);
  }
});
route.post('/one', async (req, res) => {
  const { userId, id } = req.body;
  try {
    if (userId) {
      const favorite = await Favorite.findOne({ where: { userId, flatId: id }, raw: true });
      if (favorite) {
        res.send('yes');
      } else {
        res.send('no');
      }
    }
  } catch (error) {
    console.error('error in profile router ', error);
  }
});
route.post('/:id', async (req, res) => {
  const { userId } = req.body;
  try {
    const favorites = await User.findAll({ where: { id: userId }, include: Flat, raw: true });
    const myflats = await Flat.findAll({ raw: true, where: { ownerId: userId } });
    const mytrips = await Booking.findAll({ raw: true, where: { userId }, include: Flat });
    res.json({ favorites, myflats, mytrips });
  } catch (error) {
    console.error('error in profile router ', error);
  }
});

module.exports = route;
