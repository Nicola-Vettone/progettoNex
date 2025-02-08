import mongoose from "mongoose";

const mongo_url = "mongodb://admin:password@localhost:27017/CorsoNexus1?authSource=admin";

async function connectDb() {
  try {
    const conn = await mongoose.connect(mongo_url, {});
    console.log(`MongoDB Connesso: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Errore: ${error.message}`);
    process.exit(1);
  }
}

export default connectDb;
