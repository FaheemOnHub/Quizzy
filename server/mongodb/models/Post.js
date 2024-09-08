import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: false },
});
const resultSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedAnswer: { type: String, required: true },
    },
  ],
  score: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now },
});
const quizSchema = new mongoose.Schema({
  quizId: { type: String, unique: true, default: uuidv4 },
  ownerEmail: { type: String, require: true },
  title: { type: String, required: true },
  description: { type: String, required: false },
  questions: {
    type: [questionSchema], //question array
    required: true,
  },
  result: {
    type: [resultSchema], //resultant array
  },
  // questionText: String,
  // type: String,
  // options: [String],
  // correctAnswer: String,
});
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
