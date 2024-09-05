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

export default router;
