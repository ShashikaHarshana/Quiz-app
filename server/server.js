const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const tutorialRoutes = require("./routes/tutorialRoutes");
const quizRoutes = require("./routes/quizRoutes");

app.use("/admin/tutorials", tutorialRoutes);
app.use("/adminApp/quizzes", quizRoutes);

const PORT = 5000;
const DB_URL =
  "mongodb+srv://CodePedia:Y3S1@cluster0.y81ww5h.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database was connected");
  })
  .catch((err) => {
    console.log("Database was not connected, Error orccured");
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
