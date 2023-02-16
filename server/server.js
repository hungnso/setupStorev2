require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
// app
const app = express();

// db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));

// middleware

app.use((function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_DOMAIN)
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
}))
app.use(cors({
  origin: '*'
}));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));

// routes middleware
readdirSync("./modules").map((r) => app.use("/api", require("./modules/" + r)));

// port
const port = process.env.PORT || 9191;


app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}`);
});
