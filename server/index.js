import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import saveQuiz from "./routes/saveQuiz.js";
import fetchQuiz from "./routes/fetchQuiz.js";
import adminFetch from "./routes/adminFetch.js";
import convertImg from "./routes/convertImg.js";
import auth from "./routes/auth.js";
import Quiz from "./mongodb/models/Post.js";
import { authenticateToken } from "./middleware/auth.js";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/user", auth);

app.use("/api", fetchQuiz);
app.use("/admin", authenticateToken, adminFetch);
app.use("/saveQuiz", saveQuiz);
app.use("/cloudinary", convertImg);
//clean the db <-->
app.get("/delete", async (req, res) => {
  try {
    const response = await Quiz.deleteMany({});
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

app.listen(PORT, async () => {
  await startServer();
});
export default PORT;
