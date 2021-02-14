const express = require('express')
const products = require('./data/products')

const app = express();


app.get('/', (req, res)=>{
    res.send('API is running');
});


app.get('/api/products', (req, res)=>{
    res.json(products);
});

app.get('/api/products/:id', (req, res)=>{
    const id = req.params.id; 
    let status = 404; 
    let success = false; 
    let message = `No product found with the id of ${id}`;
    let outProduct = [];

    outProduct = products.filter(product=>product._id===id);
        
    if(outProduct.length > 0){
        status = 200; 
        success = true;
        message = undefined;
    }

    res.status(status).json({
        success: true,
        message,
        data: outProduct
    })
});


app.listen(5000, console.log('Server running on port 5000'));


