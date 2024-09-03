import React, { useEffect } from "react";
import { useState } from "react";
import QuestionForm from "./Components/QuestionForm";
const App = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem("quizTitle"); // Clear data from localStorage
    localStorage.removeItem("quizDescription");
    localStorage.removeItem("quizQuestions");
    setTitle("");
    setDescription("");
    setQuestions([]);
    alert("Form has been cleared");
  };
  const [title, setTitle] = useState(() => {
    return localStorage.getItem("quizTitle") || "";
  });
  const [description, setDescription] = useState(() => {
    return localStorage.getItem("quizDescription") || "";
  });
  // const [questions, setQuestions] = useState([]);
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("quizQuestions");
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });
  useEffect(() => {
    localStorage.setItem("quizTitle", title);
  });
  useEffect(() => {
    localStorage.setItem("quizDescription", description);
  });
  useEffect(() => {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
  }, [questions]);
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        type: "multiple-choice",
        options: ["", ""],
        correctAnswer: "",
      },
    ]);
  };
  const updateQuestion = (index, updatedQuestion) => {
    setQuestions(
      questions.map((q, i) => {
        return i === index ? updatedQuestion : q;
      })
    );
  };
  return (
    <div className="">
      <div
        id="navbar"
        className="flex flex-row justify-between items-center p-4 m-auto ml-20 mr-20"
      >
        <h3 className="text-4xl">quizMaker</h3>
        <div className="text-4xl">
          <ion-icon name="settings-outline"></ion-icon>
        </div>
      </div>
      <div
        id="main"
        className="flex flex-col justify-center items-center mt-20"
      >
        <h1 className="text-4xl text-blue-300">
          Create awesome quiz in minutes
        </h1>
        <p className="mt-2">Quiz Maker makes it super easy to take quizzes</p>
        {/* Quiz Form */}
        <div className="border border-white max-w-[800px] mt-10 p-4">
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => {
              return setTitle(e.target.value);
            }}
            className=" min-w-96 p-2 w-full mb-4 text-xl"
          />
          <textarea
            name=""
            id=""
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-w-96 w-full text-lg mb-4"
          ></textarea>
          {/* Render each question using the QuestionForm component */}
          {questions.map((question, index) => {
            return (
              <QuestionForm
                index={index}
                key={index}
                question={question}
                updateQuestion={updateQuestion}
              />
            );
          })}
          {/* Questions List */}
          {/* {questions.map((question, index) => {
            return (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Question"
                  value={question.questionText}
                  onChange={(e) => {
                    return setQuestions(
                      questions.map((q, i) => {
                        return i === index
                          ? { ...q, questionText: e.target.value }
                          : q;
                      })
                    );
                  }}
                  className="w-full p-2 mb-2"
                />
                <select
                  value={question.type}
                  onChange={(e) => {
                    return setQuestions(
                      questions.map((q, i) => {
                        return i === index ? { ...q, type: e.target.value } : q;
                      })
                    );
                  }}
                  className="p-2"
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                  <option value="short-answer">Short Answer</option>
                </select>
              </div>
            );
          })} */}

          <button
            onClick={addQuestion}
            className="bg-primary p-2 text-white rounded mt-4"
          >
            Add Question
          </button>
          <button
            onClick={clearLocalStorage}
            className="bg-primary p-2 text-white rounded mt-4 ml-4"
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
