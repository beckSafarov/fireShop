import express from 'express'
import products from './data/products.js'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'


//function declarations
dotenv.config();
connectDB();
const app = express();



//routes
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

//starting server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.underline.bold));


