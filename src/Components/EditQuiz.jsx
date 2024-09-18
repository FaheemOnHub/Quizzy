import React, { useEffect } from "react";
import { useState } from "react";
const EditQuiz = ({ quizData, onSave, onCancel }) => {
  const [title, settitle] = useState(quizData.title || "");
  const [description, setdescription] = useState(quizData.description || "");
  const [questions, setQuestions] = useState(quizData.questions || []);

  const handleTitleChange = (newTitle) => {
    settitle(newTitle);
  };
  // useEffect(() => {
  //   console.log(title);
  // }, [title]);
  return (
    <div className="edit-quiz-container quiz-card">
      <h2 className="font-montserrat text-xl">Edit Quiz</h2>
      <button
        onClick={() => onCancel()}
        className=" border rounded-lg shadow-lg p-2 mt-2"
      >
        Cancel Change
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
    </div>
  );
};

export default EditQuiz;
