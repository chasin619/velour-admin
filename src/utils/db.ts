import mongoose, { Connection } from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable");
}

declare global {
  var mongooseCache:
    | { conn: Connection | null; promise: Promise<Connection> | null }
    | undefined;
}

let cached: { conn: Connection | null; promise: Promise<Connection> | null } =
  globalThis.mongooseCache || { conn: null, promise: null };

const dbConnect = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGO_URI).then(() => console.log("Connected To MongoDB")).catch(e => console.log(e)) as any;
  }

  cached.conn = await cached.promise;
  globalThis.mongooseCache = cached;
};

export default dbConnect;
