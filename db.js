/* eslint-disable no-undef */
import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";

config();
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL_CLUSTER}/?retryWrites=true&w=majority&appName=myWeb`;

// console.log(uri);

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function insertOne(data) {
  try {
    await client.connect();

    const dbInstance = client.db("content");
    const collection = dbInstance.collection("articles");

    return await collection.insertOne(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function insertOneResponse(data) {
  try {
    await client.connect();

    const dbInstance = client.db("content");
    const collection = dbInstance.collection("articles");
    // console.log({ title: data.title });
    const update = await collection.updateOne(
      { title: data.title },
      {
        $push: {
          comments: { name: data.name, comment: data.comment, date: data.date },
        },
      }
    );
    return { status: update.acknowledged };
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function insertMany(data) {
  try {
    await client.connect();

    const dbInstance = client.db("content");
    const collection = dbInstance.collection("articles");

    return await collection.insertMany(data);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function readAchievement() {
  try {
    await client.connect();

    const dbInstance = client.db("content");
    const collection = dbInstance.collection("achievements");

    return await collection.find({}).toArray();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function readArticles() {
  try {
    await client.connect();

    const dbInstance = client.db("content");
    const collection = dbInstance.collection("articles");

    return await collection.find({}).toArray();
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

export async function insertOneAch(name, img, url, issuer, provided_by) {
  try {
    client.connect;

    const dbInstance = client("content");
    const collection = dbInstance.collection("achievements");

    return await collection.insertOne({
      name: name,
      img: img,
      url: url,
      issuer: issuer,
      provided_by: provided_by,
    });
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
