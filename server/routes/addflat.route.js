const route = require('express').Router();
const axios = require('axios');
const { Flat } = require('../db/models');
const fileMiddleware = require('../middleware/file');

route.post('/', async (req, res) => {
  const {
    ownerId, category, bed, bathroom, type, guests, parking, pets, smoking, country, city, address,
    costPerNight, description, kitchen, airCondition, wifi, TV, heating, hairdryer,
    washingMachine, refrigerator, stove, photos,
  } = req.body;

  const coord = await axios.get(`https://geocode-maps.yandex.ru/1.x/?apikey=9e68dad6-a5b6-4237-bfa0-02b4a68d8290&format=json&geocode=${city}+${address}`, { withCredentials: true });
  const coordinates = coord.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ').reverse().join(', ');
  const findmaxid = await Flat.max('id');
  const newFlat = await Flat.create({
    ownerId,
    id: findmaxid + 1,
    category,
    country,
    city,
    address,
    coordinates,
    type,
    bedsQty: bed,
    guestsQty: guests,
    costPerNight,
    description,
    kitchen,
    bathroom,
    aitConditioning: airCondition,
    heating,
    wifi,
    pets,
    smoking,
    parking,
    tv: TV,
    hairdryer,
    washingMachine,
    refrigerator,
    stove,
    rating: 5,
    photos,
  });
  const newId = newFlat.toJSON().id;
  res.json({ newId });
});

route.post('/upload', fileMiddleware.single('avatar'), (req, res) => {
  try {
    if (req.file) {
      res.json(req.file);
    } else {
      console.log('nooooooo');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
