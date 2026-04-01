import { MongoClient } from "mongodb";
import { env } from "@/lib/env";
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(env.mongodbUri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(env.mongodbUri, options);
  clientPromise = client.connect();
}

export default clientPromise;
