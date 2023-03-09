import { connect, ConnectOptions } from 'mongoose';

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      `Please define the MONGODB_URI environment variable inside .env.local`,
    );
  }
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions;
    cached.promise = connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
      .catch((err) => console.error(err));
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

dbConnect();
