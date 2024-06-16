const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const isAdmin = require('../middleware/adminMiddleware')

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

router.get('/addProduct', productController.addProductPage)
router.post('/addProduct',isAdmin, upload.single('image') , productController.addProducts)
router.get('/getAllProduct', productController.getAllProducts)

module.exports = router;