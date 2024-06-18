const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true},
    desc: { type: String, required: true},
    price: { type: String, default: 99 },
    image: { type: String, required: true },
    category: { type: String, required: true },
    sizes: [{ type: String, enum:['M', 'XL', 'S']}],
},
{
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;