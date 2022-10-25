const route = require('express').Router();
const { User } = require('../db/models');

route.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ raw: true, where: { id } });
    res.json({ user });
  } catch (error) {
    console.error('error in profile router ', error);
  }
});

module.exports = route;
