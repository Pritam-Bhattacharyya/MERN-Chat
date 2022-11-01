const express = require("express");
const env = require("dotenv");
const data = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

app.use(express.json());
env.config();
connectDB();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Linking Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);
// app.get("/chats", (req, res) => {
//   res.send(data);
// });

// app.get("/chat/:id", (req, res) => {
//   console.log(req.params.id);
//   res.send(data.find((item) => item._id === req.params.id));
// });

app.listen(
  port,
  console.log(`server started on http://localhost:${port}`.yellow.bold)
);
