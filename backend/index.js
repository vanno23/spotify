const express = require("express");
const cors = require("cors"); // Import the cors package
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Use the cors middleware to allow all origins
app.use(cors());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/likedItems", require("./routes/likedRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.listen(port, () => console.log(`Server start on port ${port}`));
