require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use(express.static("public"));

// home
app.get("/", async function (req, res) {
//   res.render("pages/index");
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});