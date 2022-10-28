const express = require("express");
const env = require("dotenv");
const data = require("./data/data");
const app = express();
env.config();
const port = process.env.PORT;

app.get("/chats", (req, res) => {
  res.send(data);
});


app.get("/chat/:id", (req, res) => {
  console.log(req.params.id);
  res.send(data.find((item) => item._id === req.params.id));
});

app.listen(port, console.log(`server started on http://localhost:${port}`));
