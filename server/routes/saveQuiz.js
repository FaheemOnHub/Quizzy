import express from "express";
import * as dotenv from "dotenv";
import Quiz from "../mongodb/models/Post.js";
const router = express.Router();
router.route("/").get(async (req, res) => {
  res.status(201).json("hey");
});
router.route("/").post(async (req, res) => {
  try {
    const { ownerEmail, title, description, questions } = req.body;
    const newQuiz = new Quiz({
      ownerEmail,
      title,
      description,
      questions: questions.map((q, i) => {
        return {
          questionText: q.questionText,
          type: q.type,
          options: q.options,
          correctAnswer: q.correctAnswer,
        };
      }),
    });
    const savedQuiz = await newQuiz.save();
    res
      .status(200)
      .json({ message: "Quiz saved successfully!", quizId: newQuiz.quizId });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to save the quiz", details: error.message });
  }
});
export default router;
