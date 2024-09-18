import React, { useEffect } from "react";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
const EditQuiz = ({ quizData, onSave, onCancel }) => {
  const [title, settitle] = useState(quizData.title || "");
  const [description, setdescription] = useState(quizData.description || "");
  const [questions, setQuestions] = useState(quizData.questions || []);

  const handleTitleChange = (newTitle) => {
    settitle(newTitle);
  };
  const handleQuestionChange = (index, newQuestion) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index].questionText = newQuestion;
    setQuestions(updatedQuestion);
  };
  const handleAnswerChange = (index, newAnswer) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index].correctAnswer = newAnswer;
    setQuestions(updatedQuestion);
  };
  return (
    <div className="edit-quiz-container quiz-card">
      <h2 className="font-montserrat text-xl">Edit Quiz</h2>
      <button
        onClick={() => onCancel()}
        className=" border rounded-lg shadow-lg p-2 mt-2"
      >
        Back
      </button>
      <input
        type="text"
        placeholder="Quiz Title"
        value={title}
        required
        onChange={(e) => {
          return handleTitleChange(e.target.value);
        }}
        className=" min-w-96 p-2 w-full mb-4 mt-4 text-xl font-montserrat rounded-lg input"
      />
      <textarea
        name=""
        id=""
        placeholder="Quiz Description"
        value={description}
        onChange={(e) => setdescription(e.target.value)}
        className="min-w-96 p-2 w-full text-lg mb-4 font-montserrat resize-none rounded-lg input"
      />
      <h3 className="font-montserrat text-xl">Edit Questions</h3>
      {questions.map((q, index) => {
        return (
          <div className="flex flex-col mt-2 mb-2">
            <input
              type="text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full p-4 mb-2 font-montserrat "
            />

            {/* <input
              type="text"
              value={q.correctAnswer}
              onChange={(e) => {
                handleAnswerChange(index, e.target.value);
              }}
              className="w-full p-2 mb-2 font-montserrat"
            /> */}
          </div>
        );
      })}
    </div>
  );
};

export default EditQuiz;
