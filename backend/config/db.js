import mongoose from 'mongoose';
const env = process.env.NODE_ENV
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    if (env === 'production') {
      console.log(`MongoDB Connected: ${conn.connection.host}`)
      return
    }
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold)
  } catch (error) {
    if (env === 'production') {
      console.log(error)
      return
    }
    console.error(`Mongo Error: ${error.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default connectDB; 