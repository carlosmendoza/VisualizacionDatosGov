const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const expressMongoDb = require("express-mongo-db");
const path= require("path")
const app = express();
require('dotenv').config()

let db
MongoClient.connect(
  process.env.DATABASE_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err, database) => {
    if (err) return console.log("error",err);
    db = database;
    console.log("Connected to database");
    app.listen(app.get("port"), () =>
      console.log(`Server on port ${app.get("port")}`)
    );
  }
);


app.set("port", process.env.PORT || 5000);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(expressMongoDb(process.env.DATABASE_URL));

const historialRouter = require("./routes/historial");
app.use("/historial", historialRouter);

if (process.env.NODE_ENV !== "production") 
{
  require("dotenv").config();
} else 
{
  app.use(express.static("client/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}