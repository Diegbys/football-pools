import mongoose from "mongoose";

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  console.log(process.env.MONGO_URI);

  const db = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log(connection.isConnected);
}

export default dbConnect;
