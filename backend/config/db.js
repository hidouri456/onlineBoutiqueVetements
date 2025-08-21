import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host} - db.js:6`);
  } catch (error) {
    console.error(`Error: ${error.message} - db.js:8`);
    process.exit(1);
  }
};

export default connectDB;