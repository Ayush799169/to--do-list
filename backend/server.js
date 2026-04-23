
require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

 const app =express();
  connectDB();

  app.use(express.json());
  app.use(cors());

  app.use('/api/tasks', require("./routes/taskRoutes"));
  app.get("/", (req, res) => {
    res.send("API is running...");
});

 const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


