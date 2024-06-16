const Product = require('../models/productModel')
const fs = require("fs")

module.exports.addProductPage = async (req, res)=>{
    return res.render("addProduct")
}

module.exports.addProducts = async (req, res) => {
    try {
        console.log('File:', req.file);
        console.log('Body:', req.body);
        let image_file = `${req.file.filename}`;
        const { name, desc, price, category, sizes } = req.body;
        // Construct the product data object
        let productData = {
            name,
            desc,
            price,
            imageUrl: image_file,
            category,
        };
         // Ensure sizes is stored only if selected
         if (sizes) {
            productData.sizes = Array.isArray(sizes) ? sizes : [sizes];
        }

        const product = await Product.create(productData);

        
        res.status(200).send({ success: true, message: "Product created successfully", product });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'Error in add product API' });
    }
};

module.exports.getAllProducts = async (req, res)=>{

}