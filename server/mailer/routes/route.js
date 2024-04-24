const router = require('express').Router();
const { signup } = require('../appController');

router.post('/user/signup', signup);

module.exports = router;
