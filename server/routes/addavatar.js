const route = require('express').Router();
const { User } = require('../db/models');

const avatarMiddleware = require('../middleware/avatar');

route.post('/:id', avatarMiddleware.single('favorite'), async (req, res) => {
  const { id } = req.params;
  try {
    if (req.file) {
      await User.update({ picture: `http://localhost:3001/${req.file.path}` }, { where: { id } });
      res.json(req.file);
    } else {
      console.log('nooooooo');
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
