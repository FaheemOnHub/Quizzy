import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionForm from "./Components/QuestionForm";
import QuizPage from "./Components/QuizPage";
const App = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem("quizTitle");
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
  const handleSaveQuiz = async () => {
    const quizData = { title, description, questions };
    try {
      const response = await fetch("http://localhost:3000/saveQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();
      console.log(data);
      clearLocalStorage();
      alert("Quiz saved successfully");
    } catch (error) {
      alert("Error saving quiz");
    }
  };
  return (
    <Router>
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

          <div className="border border-white max-w-[800px] mt-10 p-4">
            <input
              type="text"
              placeholder="Quiz Title"
              value={title}
              required
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
            <button
              onClick={handleSaveQuiz}
              className="bg-green-500 p-2 text-white rounded mt-4 ml-4"
            >
              Save Quiz
            </button>
          </div>
        </div>
        <Routes>
          <Route path="/quiz/:id" element={<QuizPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
