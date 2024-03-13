import { config } from "dotenv";
config();
import express from "express";
import DbConfig from "./config/dbConfig";
import mongoose from "mongoose";
const app = express();
const port = process.env.PORT;

DbConfig();
app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

app.listen(port, () => {
  return console.log(`server is running on port ${port}`);
});
mongoose.connection.on("error", (error) => {
  console.log(error);
});
// )
