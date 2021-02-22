import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

//function declarations
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
//routes
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);

//starting server
const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline.bold
  )
);

//handle unhandled rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('unhandledRejection', err.message);
  //close server & exit process
  server.close();
});

//handling crashes
process.on('uncaughtException', (err, promise) => {
  console.log(
    'Stupid Error that happens when the address is being used'.red.underline
      .bold
  );
  //close server & exit process
  app.removeAllListeners();
  process.exit(1);
});

//killing server
process.on('SIGTERM', (err, promise) => {
  console.log('SIGTERM', err.message);
  //close server & exit process
  server.close();
});
