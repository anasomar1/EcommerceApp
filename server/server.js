const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();

//app
const app = express();

// database
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO THE DB"))
  .catch((err) => console.log(`DB CONNECTION Error ${err} `));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());

// routes middleware
fs.readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log("Server is running"));
