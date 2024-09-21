import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import QuizPage from "./QuizPage";
import Swal from "sweetalert2";
const App = () => {
  const clearLocalStorage = () => {
    localStorage.removeItem("quizTitle");
    localStorage.removeItem("quizDescription");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("ownerEmail");
    setTitle("");
    setDescription("");
    setownerEmail("");
    setQuestions([]);

    Swal.fire({
      icon: "success",
      title: "Form is cleared",
    });
  };
  const [isEmailValid, setisEmailValid] = useState(false);
  const [ownerEmail, setownerEmail] = useState(() => {
    return localStorage.getItem("ownerEmail") || "";
  });
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
    localStorage.setItem("ownerEmail", ownerEmail);
    handleEmail(ownerEmail);
  }, [ownerEmail]);
  useEffect(() => {
    localStorage.setItem("quizTitle", title);
  });
  useEffect(() => {
    localStorage.setItem("quizDescription", description);
  });
  useEffect(() => {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
  }, [questions]);
  const handleEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setisEmailValid(emailPattern.test(email));
  };
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
    if (!isEmailValid) {
      Swal.fire({
        icon: "warning",
        title: "Kindly enter a valid email",
      });
      return;
    }
    if (title.length <= 2) {
      Swal.fire({
        icon: "warning",
        title: "Quiz Title is required",
      });
      return;
    }
    if (questions.length <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Atleast add 1 Question to the Quiz",
      });
      return;
    }
    const quizData = { ownerEmail, title, description, questions };
    try {
      const response = await fetch(
        "https://quizzy-y6vr.onrender.com/saveQuiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );
      const data = await response.json();
      console.log(data);
      clearLocalStorage();
      Swal.fire({
        icon: "success",
        title: "Quiz saved successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to save",
      });
    }
  };
  return (
    <div className="">
      <div
        id="main"
        className="flex flex-col justify-center items-center mt-20"
      >
        <h1 className="lg:text-4xl text-xl text-blue-300 font-montserrat p-2">
          Create awesome quiz in minutes
        </h1>
        <p className="mt-2 font-montserrat p-2 ">
          qu🤯zzy makes it super easy to take quizzes
        </p>

        <div className="border border-white lg:max-w-[800px] mt-10 p-2 rounded-lg ">
          <input
            type="email"
            id="email"
            pattern=".+@example\.com"
            size="30"
            required
            value={ownerEmail}
            className="input font-montserrat font-normal mb-4 border border-black mx-auto"
            placeholder="Enter your Email:"
            onChange={(e) => setownerEmail(e.target.value)}
          />
          {!isEmailValid && ownerEmail && (
            <p className="text-blue-500 m-1 lg:mg-4 font-montserrat alert">
              Please enter a valid email
            </p>
          )}
          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            required
            onChange={(e) => {
              return setTitle(e.target.value);
            }}
            className=" lg:min-w-96 p-2 w-full mb-4 text-xl font-montserrat rounded-lg"
          />
          <textarea
            name=""
            id=""
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="lg:min-w-96 p-2 w-full text-lg mb-4 font-montserrat resize-none rounded-lg"
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
            className="bg-primary p-2 text-white rounded mt-4 font-montserrat"
          >
            Add Question
          </button>
          <button
            onClick={clearLocalStorage}
            className="bg-primary p-2 text-white rounded mt-4 ml-4 font-montserrat"
          >
            Clear Form
          </button>
          <button
            onClick={handleSaveQuiz}
            className="bg-green-500 p-2 text-white rounded mt-4 ml-4 font-montserrat transform rotate-3
            "
          >
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
