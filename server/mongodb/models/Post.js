import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: false },
});
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  questions: {
    type: [questionSchema],
    required: true,
  },
  // questionText: String,
  // type: String,
  // options: [String],
  // correctAnswer: String,
});
const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
