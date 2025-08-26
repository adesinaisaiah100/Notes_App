import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

type MongooseGlobalCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var _mongooseGlobalCache: MongooseGlobalCache | undefined;
}

// Use a global variable so that the value is preserved across module reloads
// in development (and serverless environments).
let cached = global._mongooseGlobalCache;

if (!cached) {
  cached = { conn: null, promise: null };
  global._mongooseGlobalCache = cached;
}

export async function connectDB() {
  // cached is initialized above; use non-null assertion to satisfy TypeScript
  if (cached!.conn) return cached!.conn;

  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }

  cached!.conn = await cached!.promise;
  return cached!.conn;
}
