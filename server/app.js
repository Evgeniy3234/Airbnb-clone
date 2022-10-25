require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

// экспорт роутов
const userRoute = require('./routes/user.route');
const cardRoute = require('./routes/card.route');
const yaMapRoute = require('./routes/yaMap.route');
const flatRoute = require('./routes/flat.route');
const bookingRoute = require('./routes/booking.route');
const searchRoute = require('./routes/search.route');
const addflatRoute = require('./routes/addflat.route');
const favoriteRoute = require('./routes/favorite.route');
const addavatarRoute = require('./routes/addavatar');
const findinfoRoute = require('./routes/findinfo.route');

const app = express();
app.use(express.json({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/avatar', express.static(path.join(__dirname, 'avatar')));

const PORT = process.env.PORT || 3001;
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001'],
  }),
);

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use роуты
app.use('/allFlat', cardRoute);
app.use('/yaMap', yaMapRoute);
app.use('/flat', flatRoute);
app.use('/flat/booking', bookingRoute);
app.use('/search', searchRoute);
app.use('/auth', userRoute);
app.use('/addFlat', addflatRoute);
app.use('/favorite', favoriteRoute);
app.use('/addavatar', addavatarRoute);
app.use('/findinfo', findinfoRoute);

app.listen(PORT, () => {
  console.log(`server started PORT: ${PORT}`);
});
