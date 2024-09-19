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
            {q.type == "multiple-choice" && (
              <div key={index}>
                {q.options.map((option, optionIndex) => {
                  return (
                    <div
                      className="flex items-center mb-2 mx-auto"
                      key={optionIndex}
                    >
                      <span className="p-2 mb-2 border rounded-full input mt-1">
                        {optionIndex + 1}
                      </span>
                      <input
                        type="text"
                        key={optionIndex}
                        placeholder={`Option ${optionIndex + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(optionIndex, e.target.value)
                        }
                        className="w-full p-2 mb-2 font-montserrat"
                      />
                      <div className="flex items-center justify-center">
                        <label className="ml-2 text-sm font-medium font-mon text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 min-w-[100px] rounded-lg ">
                          <input
                            type="radio"
                            name={`correct-answer-${index}`}
                            id={`correct-answer-${index}`}
                            checked={q.correctAnswer === option}
                            onChange={() => handleCorrectAnswerChange(option)}
                            className="w-6"
                          />
                          Correct
                        </label>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={() =>
                    updateQuestion(index, {
                      ...question,
                      options: [...question.options, ""],
                    })
                  }
                  className="bg-secondary p-1 text-white rounded"
                >
                  Add Option
                </button>
                <button
                  onClick={() =>
                    updateQuestion(index, {
                      ...question,
                      options: [...question.options.slice(0, -1)],
                    })
                  }
                  className="bg-secondary p-1 text-white rounded ml-10"
                >
                  Delete Option
                </button>
              </div>
            )}
            {q.type === "true-false" && (
              <div className="">
                <input
                  type="radio"
                  id={`true-${index}`}
                  name={`true-false-${index}`}
                  value="True"
                  checked={q?.options[0] === "True"}
                  onChange={() => {
                    updateQuestion(index, {
                      ...question,
                      options: ["True", "False"],
                      correctAnswer: "True",
                    });
                  }}
                />
                <label htmlFor={`true-${index}`} className="p-4">
                  True
                </label>
                <input
                  type="radio"
                  id={`false-${index}`}
                  name={`true-false-${index}`}
                  value="False"
                  checked={q?.options[0] === "False"}
                  onChange={() => {
                    updateQuestion(index, {
                      ...question,
                      options: ["False", "True"],
                      correctAnswer: "False",
                    });
                  }}
                />
                <label htmlFor={`false-${index}`} className="p-4">
                  False
                </label>
              </div>
            )}
            {q.type === "short-answer" && (
              <input
                type="text"
                placeholder="Short Answer"
                value={q.options[0]}
                onChange={(e) =>
                  updateQuestion(index, {
                    ...question,
                    options: [e.target.value],
                  })
                }
                className="w-full p-2 mb-2"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default EditQuiz;
