const mongoose = require("mongoose");
const uri = process.env.uri;
mongoose.connect(uri);
const connection = mongoose.connection;

connection
  .on("open", () => console.log("connected to mongodb"))
  .on("close", () => console.log("disconnected!"))
  .on("error", () => console.log("error"));
