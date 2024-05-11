const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://zdrosama:WnrAvqvEiYVJbjyq@cluster0.vhhnmlg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to cluster MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
//WnrAvqvEiYVJbjyq
