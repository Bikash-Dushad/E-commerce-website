const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send('<h1>Hello brother</h1>');
});

router.use('/api/v1/auth', require('./authRoute'))

router.use('/api/v1/user', require('./userRoute'));

router.use('/api/v1/products', require('./productRoute'))

module.exports = router;