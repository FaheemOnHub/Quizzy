import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Alert, AlertDescription } from "./ui/alert";
import {
  ChevronLeft,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const QuizResponse = ({ quizId, quizData, onBack, onUpdateQuizData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleManualGrading = async (responseIndex, questionIndex, value) => {
    setLoading(true);
    try {
      const updatedQuizData = { ...quizData };
      const updatedResponse = updatedQuizData.result[responseIndex];
      const prevCorrect = updatedResponse.answers[questionIndex].isCorrect;
      updatedResponse.answers[questionIndex].isCorrect =
        value === "correct" ? "true" : "false";

      if (prevCorrect !== updatedResponse.answers[questionIndex].isCorrect) {
        updatedResponse.score +=
          updatedResponse.answers[questionIndex].isCorrect === "true" ? 1 : -1;
      }

      await onUpdateQuizData(updatedQuizData);
      await UpdateGrades(updatedQuizData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const UpdateGrades = async (updatedData) => {
    try {
      const response = await fetch(
        `https://quizzy-y6vr.onrender.com/saveQuiz/${updatedData._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result: updatedData.result }),
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const updatedQuiz = await response.json();
      console.log("Successfully updated grades:", updatedQuiz);
    } catch (error) {
      console.error(error);
      setError("Failed to update grades. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (selectedResponse !== null) {
    const responseData = quizData.result[selectedResponse];
    return (
      <Card className="max-w-3xl mx-auto ">
        <CardHeader>
          <CardTitle>Response by {responseData.userID}</CardTitle>
          <CardDescription>Score: {responseData.score}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button variant="outline" onClick={() => setSelectedResponse(null)}>
            <ChevronLeft className="h-4 w-4 mr-2" /> Back to All Responses
          </Button>
          {quizData.questions.map((q, i) => (
            <Card key={i} className="p-4">
              <CardTitle className="text-lg mb-2">Question {i + 1}</CardTitle>
              <CardDescription className="mb-4">
                {q.questionText}
              </CardDescription>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Label>Answer:</Label>
                  <span className="font-medium">
                    {responseData.answers[i].selectedAnswer}
                  </span>
                </div>
                {q.correctAnswer ? (
                  <div className="flex items-center space-x-2">
                    {responseData.answers[i].selectedAnswer ===
                    q.correctAnswer ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                    <Label>Correct Answer:</Label>
                    <span className="font-medium">{q.correctAnswer}</span>
                  </div>
                ) : (
                  <div className="mt-2">
                    <Label className="mb-2 block">Mark as:</Label>
                    <RadioGroup
                      value={
                        responseData.answers[i].isCorrect === "true"
                          ? "correct"
                          : "incorrect"
                      }
                      onValueChange={(value) =>
                        handleManualGrading(selectedResponse, i, value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="correct" id={`correct-${i}`} />
                        <Label htmlFor={`correct-${i}`}>Correct</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="incorrect"
                          id={`incorrect-${i}`}
                        />
                        <Label htmlFor={`incorrect-${i}`}>Incorrect</Label>
                      </div>
                    </RadioGroup>
                    <p className="mt-2 text-sm flex items-center gap-2">
                      {responseData.answers[i].isCorrect === "true" ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>Marked as Correct</span>
                        </>
                      ) : responseData.answers[i].isCorrect === "false" ? (
                        <>
                          <XCircle className="h-5 w-5 text-red-500" />
                          <span>Marked as Incorrect</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span>Not marked yet</span>
                        </>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{quizData.title}: Respondents</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ChevronLeft className="h-4 w-4 mr-2" /> Back to All Quizzes
        </Button>
        <ul className="space-y-2">
          {quizData?.result.map((response, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-secondary rounded"
            >
              <span className="font-medium">{response.userID}</span>
              <div className="flex items-center space-x-4">
                <span>Score: {response.score}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedResponse(index)}
                >
                  View Response
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default QuizResponse;
