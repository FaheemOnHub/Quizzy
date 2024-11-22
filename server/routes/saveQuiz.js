import express from "express";
import * as dotenv from "dotenv";
import Quiz from "../mongodb/models/Post.js";
const router = express.Router();
router.route("/").get(async (req, res) => {
  res.status(201).json("hey");
});
router.route("/updateQuiz/:id").patch(async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await Quiz.findById(id);
    console.log(quiz);
    if (!quiz) {
      return res.status(404).json({
        status: "Error",
        message: "Quiz not found",
      });
    }

    const updatedQuiz = await Quiz.findOneAndUpdate({ _id: id }, req.body, {
      new: true, // Returns the updated document
    });

    res.status(200).json({
      status: "Updated",
      updateQuiz: updatedQuiz,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Failed to update quiz",
      error: error.message,
    });
  }
});
router.route("/:id").patch(async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Quiz.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "Updated",
      quizData: task,
    });
  } catch (error) {
    res.status(404).json({
      error,
    });
  }
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
