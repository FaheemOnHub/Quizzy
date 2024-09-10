import React, { useEffect, useState } from "react";
import QuizPage from "../Components/QuizPage";
import QuizResponse from "../Components/QuizResponse";

const adminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminEmail, setAdminEmail] = useState("thefaheemiquasar@gmail.com");

  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizData, setQuizData] = useState({});
  const handleviewResponse = async (quizID, quiz) => {
    console.log(quizID, quiz);
    setSelectedQuizId({ quizID });

    setQuizData(quiz);
  };
  // useEffect(() => {
  //   if (selectedQuizId) {
  //     console.log("Selected Quiz ID:", selectedQuizId);
  //   }
  //   if (quizData) {
  //     console.log("Quiz Data:", quizData);
  //   }
  // }, [selectedQuizId, quizData]);
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/admin/quizzes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminEmail}`,
          },
        });
        if (!response.ok) {
          throw new error(`${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setQuizzes(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [adminEmail]);
  return (
    <div className="main">
      {/* sidebar */}
      <div className="sidebar bg-light-gray border border-gray-600 rounded-lg max-w-32 xl:max-w-96">
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
      </div>
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
            <div className="quiz-grid  grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {quizzes.map((quiz, index) => {
                return (
                  <div
                    className="quiz-card border p-4 rounded-lg shadow-lg"
                    key={quiz._id}
                  >
                    <h3 className="font-montserrat text-lg">{quiz.title}</h3>
                    <p className="font-montserrat">{`${quiz.result.length} respondants`}</p>
                    <p className="font-montserrat">Created on: 2024-09-01</p>
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
        ) : (
          <QuizResponse
            quizId={selectedQuizId}
            quizData={quizData}
            onBack={() => setSelectedQuizId(null)}
          />
        )}
      </div>
    </div>
  );
};

export default adminDashboard;
