import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import saveQuiz from "./routes/saveQuiz.js";
dotenv.config();
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/saveQuiz", saveQuiz);
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
