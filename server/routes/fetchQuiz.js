import express from "express";
import Quiz from "../mongodb/models/Post.js";
const router = express.Router();
router.get("/quiz/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const quiz = await Quiz.findOne({ quizId: id });
    if (!quiz) {
      return res.status(400).json({ message: "Quiz not found!" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching the quiz", error: error });
  }
});
router.post("/quiz/:id/submit", async (req, res) => {
  const { id } = req.params;
  const { userAnswers } = req.body;
  try {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }
    let correctCounts = 0;
    quiz.questions.forEach((questions, index) => {
      if (
        questions.correctAnswer &&
        userAnswers[index] === questions.correctAnswer
      ) {
        correctCounts++;
      }
    });
    const result = {
      correct: correctCounts,
      total: quiz.questions.length,
      userAnswers,
    };
  } catch (error) {}
});

export default router;
