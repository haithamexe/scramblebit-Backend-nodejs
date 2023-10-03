require("dotenv").config();
const express = require("express");
const app = express();
const port = 3350;
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static("build"));
app.use("/posts", require("./routes/postsRoutes.js"));
app.get("/", (req, res) => {
  res.send("<h1>API SERVER</h1>");
});

mongoose.connection.once("open", () => {
  console.log("database connected");
  app.listen(port || 8090, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});
