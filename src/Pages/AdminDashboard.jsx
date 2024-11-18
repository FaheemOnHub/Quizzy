import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizPage from "../Components/QuizPage";
import QuizResponse from "../Components/QuizResponse";
import EditQuiz from "../Components/EditQuiz";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "../Components/ui/card";
import { Input } from "../Components/ui/input";
import { Button } from "../Components/ui/button";
import { Bolt, Eye } from "lucide-react";

const AdminDashboard = () => {
  const [transpoter, setranspoter] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setsearch] = useState("");
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [quizData, setQuizData] = useState({});

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const fetchQuizzes = useCallback(async () => {
    if (!token) {
      setError("User not authenticated");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/admin/quizzes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch quizzes");
      setLoading(false);
    }
  }, [token]);

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
    <Card className="w-full max-w-6xl mx-auto">
      {selectedQuizId === null ? (
        <>
          <CardHeader>
            <CardTitle className="font-montserrat">Admin Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              id="title"
              type="text"
              placeholder="Search here..."
              value={search}
              className="text-xl font-montserrat mt-4"
            />
            <div className="quiz-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-4 space-x-2">
              {quizzes.map((quiz, index) => {
                return (
                  <Card className="p-2" key={quiz._id}>
                    <CardHeader>
                      <CardTitle className="font-montserrat">
                        {quiz.title}
                      </CardTitle>
                      <p className="font-montserrat">{`${quiz.result.length} respondants`}</p>
                      <p className="font-montserrat">Created on: 2024-09-01</p>
                    </CardHeader>
                    <div className="flex items-center justify-between p-4 flex-wrap lg:flex-row gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleEditResponse(quiz, quiz._id)}
                      >
                        <Bolt className="h-4 w-4 mr-2" />
                        Edit Quiz
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleviewResponse(quiz._id, quiz)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Response
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </CardContent>
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
    </Card>
  );
};

export default AdminDashboard;
