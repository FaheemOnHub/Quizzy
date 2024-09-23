import React, { useCallback, useEffect, useState } from "react";
import QuizPage from "../Components/QuizPage";
import QuizResponse from "../Components/QuizResponse";
import EditQuiz from "../Components/EditQuiz";
import { Input, Description, Field, Label } from "@headlessui/react";
import clsx from "clsx";
const AdminDashboard = () => {
  const [transpoter, setranspoter] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminEmail, setAdminEmail] = useState("fami@gmail.com");

  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizData, setQuizData] = useState({});

  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://quizzy-y6vr.onrender.com/admin/quizzes`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminEmail}`,
          },
        }
      );
      const data = await response.json();
      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      console.log(`${response.status}: ${response.statusText}`);
      setLoading(false);
    }
  }, [adminEmail]);
  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);
  const handleEditResponse = (quiz, quizID) => {
    setQuizData(quiz);
    setSelectedQuizId(quizID);
    setIsEditing(true);
    setranspoter(true);
  };
  const updateQuizData = (updatedQuiz) => {
    try {
      setQuizData(updatedQuiz);
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz._id === updatedQuiz._id ? updatedQuiz : quiz
        )
      );
    } catch (error) {
      console.error(error);
      setError("Failed to update quiz data");
    }
  };
  const handleSaveQuiz = async (updatedQuiz) => {
    setQuizData(updatedQuiz);
    setSelectedQuizId(null);
    setIsEditing(false);
  };
  const handleviewResponse = async (quizID, quiz) => {
    console.log(quizID, quiz);
    setranspoter(false);
    setSelectedQuizId({ quizID });

    setQuizData(quiz);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 ">
        <div className="loading loading-spinner ">Loading...</div>
      </div>
    );
  }
  return (
    <div className="main p-4 min-h-screen ">
      {/* main-content */}
      <div
        className="content bg-gray-100 py-6 flex flex-col justify-center border rounded-lg"
        id="main-content"
      >
        {selectedQuizId === null ? (
          <>
            <div className="header">
              <h1 className="font-montserrat text-2xl p-4">
                All Quizzes made by{" "}
                <span className="font-bold text-md text-gray-300">
                  {adminEmail}
                </span>
              </h1>
              {/* <input
                type="text"
                className="search-bar input p-4 m-4"
                placeholder="Search by quiz title..."
              /> */}
              <Field>
                <Input
                  className={clsx(
                    "mt-3 p-4 block max-w-[300px] lg:max-w-[640px] rounded-lg border-none bg-gray/5  text-sm/6 text-black",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                  )}
                  placeholder="Search by quiz title..."
                ></Input>
              </Field>
            </div>
            <div className="quiz-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 mb-4">
              {quizzes.map((quiz, index) => {
                return (
                  <div
                    className="quiz-card border p-4 rounded-lg shadow-lg mb-4"
                    key={quiz._id}
                  >
                    <h3 className="font-montserrat text-lg">{quiz.title}</h3>
                    <p className="font-montserrat">{`${quiz.result.length} respondants`}</p>
                    <p className="font-montserrat">Created on: 2024-09-01</p>

                    <button
                      onClick={() => handleEditResponse(quiz, quiz._id)}
                      className="p-2 mt-2 mb-2 mr-2"
                    >
                      Edit Quiz
                    </button>
                    <button
                      className="font-montserrat p-2 mt-2 "
                      onClick={() => handleviewResponse(quiz._id, quiz)}
                    >
                      View Responses
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : isEditing && transpoter ? (
          <EditQuiz
            quizData={quizData}
            onSave={handleSaveQuiz}
            onCancel={() => (setIsEditing(false), setSelectedQuizId(null))}
          />
        ) : (
          <QuizResponse
            quizId={selectedQuizId}
            quizData={quizData}
            onBack={() => setSelectedQuizId(null)}
            onUpdateQuizData={updateQuizData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
