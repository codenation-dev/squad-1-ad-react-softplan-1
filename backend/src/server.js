const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const logs = require("./log/log.route");
const allowCors = require("./config/cors");
const app = express();

// Connect to MongoDB
const { mongoURI } = require("./config/keys");
mongoose
  .connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.use(allowCors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", logs);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
