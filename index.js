const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    // looking up all the available products
    const products = await Product.find({})

    // for testing that the products were found
    // console.log(products)

    // test with this first to see whether it works
    // res.send('ALL PRODUCTS WILL BE HERE')

    // {products} makes it available in the view
    res.render('products/index', { products })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    //checks whethe it found the product
    console.log(product);
    //checks whethher it works
    // res.send('details page!')
    res.render('products/show', { product })

})

app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})