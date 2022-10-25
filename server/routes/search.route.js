const route = require('express').Router();
const { Op } = require('sequelize');
const { Booking, Flat } = require('../db/models');

route.post('/', async (req, res) => {
  const {
    checkin, checkout, direction, guests,
  } = req.body;
  const findHome = await Flat.findAll({
    raw: true,
    include: [{
      model: Booking,
      where: {
        startDate: { [Op.notBetween]: [checkin, checkout] },
        endDate: { [Op.notBetween]: [checkin, checkout] },
      },
      required: false,
    }],
    where: { city: direction, guestsQty: { [Op.gte]: guests } },
  });
  const coor = findHome.map((el) => (
    el.coordinates.split(', ')
  ));
  const costs = findHome.map((el) => (
    el.costPerNight
  ));
  res.json({ findHome, coor, costs });
});

module.exports = route;
