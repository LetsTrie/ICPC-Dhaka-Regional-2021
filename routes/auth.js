const multer = require('multer');

const C = require('../controller/auth.js');
const router = require('express').Router();
const { auth } = require('../middlewares/auth.js');

let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, 'uploads');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

var registerUpload = multer({ storage }).fields([
  { name: 'coachDp' },
  { name: 'p1Dp' },
  { name: 'p2Dp' },
  { name: 'p3Dp' },
]);

router.post('/register/info', C.registerInfo);
router.post('/register/upload', registerUpload, C.registerUpload);
router.get('/register/payment/init', C.paymentInitiate);
router.post('/register/payment/IpnListener', C.paymentIpnListener);

router.post('/login', C.teamLogin);

router.post('/create', auth, C.createPost);

module.exports = router;
