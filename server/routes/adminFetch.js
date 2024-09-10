import express from "express";
import Quiz from "../mongodb/models/Post.js";
const router = express.Router();
router.get("/quizzes", async (req, res) => {
  const email = req.headers.authorization.split(" ")[1];
  const quizzes = await Quiz.find({ ownerEmail: email });
  console.log(quizzes);
  res.json(quizzes);
});

export default router;
