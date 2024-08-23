const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://akashsingh7202:7Ca7WEjbxiNtdkob@sheetstream.wqvuu.mongodb.net/?retryWrites=true&w=majority&appName=sheetstream');

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1); 
  }
};

module.exports = connectDB;
