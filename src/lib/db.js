const {username, password} = process.env;
export const connectionSrt="mongodb+srv://"+username+":"+password+"@cluster0.jfyfxle.mongodb.net/Finance-DB?retryWrites=true&w=majority&appName=Cluster0";
 
import { MongoClient } from "mongodb";
let client;
let db;
export async function connectToDB() {
  if (!client) {
    client = new MongoClient(connectionSrt);
    await client.connect();
    db = client.db("Finance-DB");
  }
  return { db, client };
}
export async function closeDBConnection() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}
export async function getDB() {
  if (!db) {
    const { db: database } = await connectToDB();
    db = database;
  }
  return db;
}
export async function getClient() {
  if (!client) {
    await connectToDB();
  }
  return client;
}
export async function insertTransaction(transaction) {
  const db = await getDB();
  try {
    const result = await db.collection("transactions").insertOne(transaction);
    return result;
  } catch (err) {
    console.error("DB Insert Error:", err);
    throw new Error(err.message);
  }
}
export async function getTransactions() {
  const db = await getDB();
  try {
    const transactions = await db.collection("transactions").find().toArray();
    return transactions;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    throw new Error(err.message);
  }
}
export async function deleteTransaction(id) {
  const db = await getDB();
  try {
    const result = await db.collection("transactions").deleteOne({ _id: new MongoClient.ObjectId(id) });
    return result;
  } catch (err) {
    console.error("DB Delete Error:", err);
    throw new Error(err.message);
  }
}
export async function updateTransaction(id, updates) {
  const db = await getDB();
  try {
    const result = await db.collection("transactions").updateOne(
      { _id: new MongoClient.ObjectId(id) },
      { $set: updates }
    );
    return result;
  } catch (err) {
    console.error("DB Update Error:", err);
    throw new Error(err.message);
  }
}
export async function getTransactionById(id) {
  const db = await getDB();
  try {
    const transaction = await db.collection("transactions").findOne({ _id: new MongoClient.ObjectId(id) });
    return transaction;
  } catch (err) {
    console.error("DB Fetch Error:", err);
    throw new Error(err.message);
  }
}
e