import mongoose from 'mongoose';
const env = process.env.NODE_ENV
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    if (env === 'production')
      return `MongoDB Connected: ${conn.connection.host}`
    return `MongoDB Connected: ${conn.connection.host}`.cyan.bold
  } catch (error) {
    if (env === 'production') return error
    return `Mongo Error: ${error.message}`.red.underline.bold
  }
}

export default connectDB; 