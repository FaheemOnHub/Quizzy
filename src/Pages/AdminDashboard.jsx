import React, { useEffect, useState } from "react";
import QuizPage from "../Components/QuizPage";
import QuizResponse from "../Components/QuizResponse";
import EditQuiz from "../Components/EditQuiz";

const AdminDashboard = () => {
  const [transpoter, setranspoter] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminEmail, setAdminEmail] = useState("fami@gmail.com");

  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizData, setQuizData] = useState({});
  const handleEditResponse = (quiz, quizID) => {
    setQuizData(quiz);
    setSelectedQuizId(quizID);
    setIsEditing(true);
    setranspoter(true);
  };
  const updateQuizData = (updatedQuiz) => {
    try {
      setQuizData(updatedQuiz);
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
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
        if (!response.ok) {
          throw new error(`${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setQuizzes(data);
        // console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [adminEmail, quizData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20 ">
        <div className="loading loading-spinner ">Loading...</div>
      </div>
    );
  }
  return (
    <div className="main p-2">
      {/* sidebar */}
      {/* <div className="sidebar bg-light-gray border border-gray-600 rounded-lg max-w-32 xl:max-w-96">
        <ul className="nav-links">
          <li>
            <a href="/admin">
              <i className="icon-quiz"></i> All Quizzes
            </a>
          </li>
          <li>
            <i className="icon-create"></i> Create New Quiz
          </li>
          <li>
            <i className="icon-settings"></i> Account Settings
          </li>
        </ul>
      </div> */}
      {/* main-content */}
      <div className="content " id="main-content">
        {selectedQuizId === null ? (
          <>
            <div className="header">
              <h1 className="font-montserrat text-2xl p-4">All Quizzes...</h1>
              <input
                type="text"
                className="search-bar input p-4 m-4"
                placeholder="Search by quiz title..."
              />
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
