// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const users = require("./routes/api/users");
const articles = require("./routes/api/articles");
const { checkToken } = require("./middleware/auth");

const app = express();

require("dotenv").config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(checkToken);
app.use("/api/user", users);
app.use("/api/articles", articles);

app.use(express.static("client/build"));

if (process.env.NODE_ENV === "production") {
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const start = async () => {
  const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Connected to mongodb");

    // mongoose.set("useFindAndModify", false);
  } catch (error) {
    console.log(error);
  }
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
};

start();
