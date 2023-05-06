const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, path.join(__dirname, "./uploads"));
  },
  filename: function (req, res, cb) {
    const uniqueSuffix =
      Date.now() + "_" + Math.round.apply(Math.random() * 1e9);
    const filename = file.originalname.split(".")[0];
    cb(null, filename + "_" + uniqueSuffix + ".png");
  },
});

exports.upload = multer({ storage: storage });
