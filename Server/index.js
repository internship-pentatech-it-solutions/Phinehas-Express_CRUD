const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./router/todoRoute");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", todoRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Database connected successfully`);
  })
  .catch((err) => console.error(err));

const port = 5000;

app.listen(port, () => {
  console.log(`The server is running on http://localhost:${port}`);
});
