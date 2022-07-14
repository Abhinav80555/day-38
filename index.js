// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env);
//environmental variable
const app = express();
const PORT = 1515;

//middleware->intercept->converting body to json
app.use(express.json()); //inbuilt  middleware

const MONGO_URL = process.env.MONGO_URL;
// Node - MongoDB
async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongodb is connected ✌😊");
  return client;
}
//TOP LEVEL AWAIT
const client =await createConnection();



app.get("/products", async function (req, res) {

  const movies = await client
    .db("products")
    .collection("items")
    .find({})
    .toArray();
  res.send(movies);
});


app.post("/movies", async function (req, res) {
  const data = req.body;
  console.log(data);
  //db.movies.insertmany(data)
  const result = await client.db("b33wd").collection("movies").insertMany(data);
  res.send(result);
});



app.listen(PORT, () => console.log(`App started in ${PORT}`));
