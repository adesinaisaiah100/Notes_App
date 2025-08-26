import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  namespace NodeJS {
    interface Global {
      __MONGO_CACHE__?: MongooseCache;
    }
  }
}

const g = globalThis as typeof globalThis & { __MONGO_CACHE__?: MongooseCache };

if (!g.__MONGO_CACHE__) g.__MONGO_CACHE__ = { conn: null, promise: null };

const cache = g.__MONGO_CACHE__ as MongooseCache;

export async function connectDB() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(MONGODB_URI as string).then((m) => m);
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export async function disconnectDB() {
  if (cache.conn) {
    await mongoose.disconnect();
    cache.conn = null;
    cache.promise = null;
  }
}
