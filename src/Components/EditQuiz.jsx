import React, { useEffect } from "react";
import { useState } from "react";
import QuestionForm from "./QuestionForm";
import Swal from "sweetalert2";
const EditQuiz = ({ quizData: initialData, onSave, onCancel }) => {
  const [quizData, setdata] = useState(initialData || {});
  const [title, settitle] = useState(quizData.title || "");
  const [description, setdescription] = useState(quizData.description || "");
  const [questions, setQuestions] = useState(quizData.questions || []);

  const handleTitleChange = (newTitle) => {
    setdata((data) => ({
      ...data,
      title: newTitle,
    }));
    settitle(newTitle);
  };
  const handleQuestionChange = (index, newQuestion) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index].questionText = newQuestion;
    setQuestions(updatedQuestion);
    setdata((data) => ({
      ...data,
      questions: updatedQuestion,
    }));
  };
  const handleAnswerChange = (index, newAnswer) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index].correctAnswer = newAnswer;
    setQuestions(updatedQuestion);
    setdata((data) => ({
      ...data,
      questions: updatedQuestion,
    }));
  };
  const handleOptionChange = (optionIndex, newOption, question, index) => {
    const updatedOption = question.options.map((option, index) => {
      return index === optionIndex ? newOption : option;
    });
    const updatedQuestion = [...questions];
    updatedQuestion[index].options = updatedOption;
    setQuestions(updatedQuestion);
    setdata((data) => ({
      ...data,
      questions: updatedQuestion,
    }));
  };
  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    setdata((data) => ({
      ...data,
      questions: updatedQuestions,
    }));
  };

  const saveQuiz = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/saveQuiz/updateQuiz/${quizData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save the quiz");
      }
      const result = await response.json();
      Swal.fire({
        title: "Success!",
        text: "Quiz saved successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      await onSave(quizData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit-quiz-container quiz-card">
      <h2 className="font-montserrat text-xl">Edit Quiz</h2>
      <div className="flex flex-row">
        <button
          onClick={() => onCancel()}
          className=" border rounded-lg shadow-lg p-2 mt-2"
        >
          Back
        </button>
        <button onClick={saveQuiz} className="btn-primary mt-4 ml-4 p-2">
          Save Quiz
        </button>
      </div>

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
          <div className="flex flex-col mt-2 mb-2" key={index}>
            <input
              type="text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full p-4 mb-2 font-montserrat "
            />
            {q.type === "multiple-choice" && (
              <div>
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
                          handleOptionChange(
                            optionIndex,
                            e.target.value,
                            q,
                            index
                          )
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
                            onChange={() => handleAnswerChange(index, option)}
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
                      ...q,
                      options: [...q.options, ""],
                    })
                  }
                  className="bg-secondary p-1 text-white rounded"
                >
                  Add Option
                </button>
                <button
                  onClick={() =>
                    updateQuestion(index, {
                      ...q,
                      options: [...q.options.slice(0, -1)],
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
                      ...q,
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
                      ...q,
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
                    ...q,
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
