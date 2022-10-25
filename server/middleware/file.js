const multer = require('multer');

const d = new Date();

const NoTimeDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images/');
  },

  filename(req, file, cb) {
    cb(null, `${NoTimeDate}-${file.originalname}`);
  },
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
