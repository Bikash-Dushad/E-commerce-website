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

// All product
module.exports.getAllProducts = async (req, res)=>{
    try {
        const allProducts = await Product.find({});
        if(!allProducts){
            console.log("No Product is there")
            return res.status(404).send({success: false, message:" Product is not found"})
        }
        res.status(200).send({success: true, message: " All product are here ", allProducts})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: "error in get all Product api", error})
    }
}

module.exports.updateProductPage = async (req, res)=>{
    return res.render("updateProduct")
}

//update the product
module.exports.updateProduct = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id)
        if(!product){
            return res.status(404).send({success: false, message: " product not found"})
        }
        let image_file = `${req.file.filename}`;
        const { name, desc, price, category, sizes } = req.body;

        let updateProductData = {
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
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {updateProductData})

        
        await updatedProduct.save();
        res.status(200).send({success: true, message: " product updated successfully"})
        
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: " error in update product api"})
    }
}




//remove product
module.exports.deleteProduct = async (req, res)=>{
    try {
        fs.unlink(`uploads/$(product.image)`, ()=>{})
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).send({success: false, message: " product not found"})
        }
        res.status(200).send({success: true, message: " product deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: "Error in delete product api", error})
    }
}