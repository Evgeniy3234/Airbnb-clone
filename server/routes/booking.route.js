const route = require('express').Router();
const { Booking } = require('../db/models');

route.get('/:id', async (req, res) => {
  const bookDate = await Booking.findAll({ raw: true, where: { flatId: req.params.id } });
  res.json(bookDate);
});

route.post('/:id', async (req, res) => {
  try {
    const {
      id, checkin, checkout, bookCost, duration, person, userId,
    } = req.body;
    await Booking.create({
      userId,
      flatId: id,
      startDate: checkin,
      endDate: checkout,
      days: duration,
      totalCost: bookCost,
      guests: person,
    });
  } catch (error) {
    console.error('Error', error);
  }
});


module.exports = route;
