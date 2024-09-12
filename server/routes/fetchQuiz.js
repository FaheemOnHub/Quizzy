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
    res.status(504).json({ message: "Error fetching the quiz", error: error });
  }
});
router.post("/quiz/:id/submit", async (req, res) => {
  const { id } = req.params;
  const { answers, email } = req.body;
  console.log(req.body.answers);
  try {
    const quiz = await Quiz.findOne({ quizId: id });
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    //prepare the submission
    const userSubmission = {
      userID: email,
      answers: Object.entries(answers).map(
        ([questionIndex, selectedOption]) => ({
          questionId: quiz.questions[questionIndex]._id,
          selectedAnswer: selectedOption,
          isCorrect:
            selectedOption === quiz.questions[questionIndex].correctAnswer
              ? "true"
              : "false",
        })
      ),
    };

    //if the quiz contains correct answer, then evaluate
    if (quiz.questions.some((q) => q.correctAnswer)) {
      let correctCount = 0;
      userSubmission.answers.forEach((submittedAnswer, index) => {
        const correctAnswer = quiz.questions[index].correctAnswer;
        if (submittedAnswer.selectedAnswer === correctAnswer) {
          correctCount++;
        }
      });
      userSubmission.score = correctCount;
    }
    console.log(userSubmission);
    quiz.result.push(userSubmission);
    await quiz.save();

    res.status(200).json({
      message: "Quiz successfully saved",
      result: userSubmission,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error submitting quiz: ${error.message}` });
  }
});

export default router;
