// // import express from "express";
// // import cors from "cors";
// // import request from "request";
// // import * as dotenv from 'dotenv'
// // import db0 from "./db/conn.js"
// // import data from "./Data.js"
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config({ path: "./config.env" });
// // dotenv.config({ path: "./config.env" });
// const port = process.env.PORT || 5000;
// const app = express();
// app.use(cors());
// app.use(express.json());
// // app.use(require("./routes/record"));
// const dbo = require("./db/conn");
// const data = require("./Data.json")
// // function inputData() {
// //     let db_connect = dbo.getDb();
// //     db_connect.collection("records").insertMany(data);
// // }

// // inputData()


// // app.get("/", function (req, res) {
// //     let db_connect = dbo.getDb();
// //     db_connect.collection("records").insertMany(data);
// //     res.send("Hello")
// // })
// // app.get("/backgroundImage", function (req, res) {
// //     request("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US", { json: true }, (err, response, body) => {
// //         console.log(body);
// //         res.json(body)
// //     });
// // }
// // )

// // app.post("/addkeywords", function (req, res) {
// //     let category = req.body.category;
// //     let keywords = " " + req.body.keywords.trim()
// //     return "Success"
// // })

const request = require("request");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
// app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
const data = require("./Data.json")
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

async function connectDB() {
    client.connect();
    // await client.db("keyword").collection("records").insertMany(data)
    console.log("Connected correctly to server");
}

app.get("/records", function (req, res) {
    async function getData() {
        const cursor = client.db("keyword").collection("records").find({}).sort({ "category": 1 })
        const result = await cursor.toArray()
        res.json(result)
    }
    getData()


})
app.get("/backgroundImage", function (req, res) {
    request("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US", { json: true }, (err, response, body) => {

        res.json(body)
    });
})

app.post("/addkeywords", function (req, res) {
    let category = req.body.category;
    console.log(category);
    let keywords = " " + req.body.keywords.trim()
    async function update() {
        const result = await client.db("keyword").collection("records").findOne({ category: category })
        let newData = result.content + keywords;
        console.log(newData);
        await client.db("keyword").collection("records").updateOne({ category: category }, { $set: { content: newData } });
        res.json("Success");
    }
    update()

})

app.post("/addcategory", function (req, res) {
    let category = req.body.category
    let upperCategory = category.charAt(0).toUpperCase() + category.slice(1);;
    let keywords = req.body.keywords.trim()
    async function update() {
        await client.db("keyword").collection("records").insertOne({ category: upperCategory, content: keywords })
        res.json("Success");
    }
    update()
})


app.listen(port, () => {
    connectDB()
    console.log(`Server is running on port: ${port}`);
});