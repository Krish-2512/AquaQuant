import { MongoClient } from "mongodb";
import { env } from "@/lib/env";

const options = {};

let clientPromise;

export function getMongoClientPromise() {
  if (clientPromise) {
    return clientPromise;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      const client = new MongoClient(env.mongodbUri, options);
      global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
  } else {
    const client = new MongoClient(env.mongodbUri, options);
    clientPromise = client.connect();
  }

  return clientPromise;
}
