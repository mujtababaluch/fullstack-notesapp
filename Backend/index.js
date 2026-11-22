require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const main_routes = require("./routes/main_routes");
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", main_routes);
app.use("/uploads", express.static("uploads"));

app.use((err, req, res, next) => {
  res.status(400).json({
    "statuscode": 400,
    "successcode": false,
    "message": err.message,
    "data": []
  });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
