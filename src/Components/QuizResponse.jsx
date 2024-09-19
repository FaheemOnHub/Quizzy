import React, { useEffect, useState } from "react";

const QuizResponse = ({ quizId, quizData, onBack, onUpdateQuizData }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);
  const handleManualGrading = (responseIndex, questionIndex, value) => {
    const updatedQuizData = { ...quizData };
    const updatedResponse = { ...quizData.result[responseIndex] };
    updatedResponse.answers[questionIndex].isCorrect = value === "correct";
    if (updatedResponse.answers[questionIndex].isCorrect === true) {
      updatedResponse.score += 1;
    } else {
      updatedResponse.score -= 1;
    }
    updatedQuizData.result[responseIndex] = updatedResponse;
    // quizData.result[responseIndex] = updatedResponse;
    onUpdateQuizData(updatedQuizData);

    UpdateGrades();
    console.log("here", quizData);
  };
  const UpdateGrades = async () => {
    const quizID = quizData._id;
    try {
      const response = await fetch(`http://localhost:3000/saveQuiz/${quizID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result: quizData.result }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const updatedQuiz = await response.json();
      console.log("Successfully updated grades:", updatedQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(selectedResponse);
  }, [selectedResponse]);

  if (selectedResponse != null) {
    const responseData = quizData.result[selectedResponse];
    console.log("Here is selectedRes:", responseData);
    return (
      <div>
        <button
          className=" text-white p-4 rounded-lg mb-4 bg-primary cursor-pointer transition-transform duration-300 hover:scale-110"
          onClick={onBack}
        >
          Back to All Responses
        </button>
        <h1 className="font-montserrat text-lg underline">{`User ID: ${responseData.userID}`}</h1>
        {quizData.questions.map((q, i) => {
          return (
            <div className="border border-blue-500 rounded-lg p-4 mb-4" key={i}>
              <h2 className="font-montserrat">
                {i + 1}. {q.questionText}
              </h2>
              <div className="flex justify-between md:flex-row flex-col">
                {q.correctAnswer ? (
                  <div>
                    {responseData.answers[i].selectedAnswer ===
                    q.correctAnswer ? (
                      <div className="text-green-500 flex items-center">
                        <span className="material-icons mr-2">✅</span>
                        <p>{`Answer Marked: ${responseData.answers[i].selectedAnswer}`}</p>
                      </div>
                    ) : (
                      <div className="text-red-500 flex items-center">
                        <span className="material-icons mr-2">❌</span>
                        <p>{`Answer Marked: ${responseData.answers[i].selectedAnswer}`}</p>
                      </div>
                    )}
                    <div>
                      {q.correctAnswer && (
                        <div className="text-green-500 flex items-center ml-4 mt-4">
                          <p>{`Correct Answer: ${q.correctAnswer}`}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <p>{`Answer Marked:${responseData.answers[i].selectedAnswer}`}</p>
                    <div className="mt-2">
                      <label className="text-sm font-semibold mr-2">
                        Mark as:
                      </label>
                      <select
                        className="p-2 border border-gray-400 rounded-lg"
                        value={
                          responseData.answers[i].isCorrect === true
                            ? "correct"
                            : "incorrect"
                        }
                        onChange={(e) =>
                          handleManualGrading(
                            selectedResponse,
                            i,
                            e.target.value
                          )
                        }
                      >
                        <option value="correct">Correct</option>
                        <option value="incorrect">Incorrect</option>
                      </select>
                    </div>
                    <div className="mt-2">
                      {responseData.answers[i].isCorrect !== "" ? (
                        <p>
                          {responseData.answers[i].isCorrect === true
                            ? "Marked as Correct ✅"
                            : "Marked as incorrect ❌"}
                        </p>
                      ) : (
                        <p className="font-montserrat text-yellow-500">
                          No marking yet❓
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="response-list">
      <button
        className=" text-white p-4 rounded-lg mb-4 bg-primary cursor-pointer transition-transform duration-300 hover:scale-110"
        onClick={onBack}
      >
        Back to All Quizzes
      </button>
      <h1 className="text-2xl font-montserrat mb-4">
        {quizData.title}-Respondents
      </h1>
      <ul className="list-disc pl-6 p-10">
        {quizData?.result.map((response, index) => {
          return (
            <div className="" key={index}>
              <li
                key={index}
                className="mb-2 flex flex-row justify-between p-2"
              >
                <h2 className="text-xl font-montserrat">{`${index + 1}. ${
                  response.userID
                }`}</h2>
                <button
                  className=" text-white p-4 rounded-lg mb-4 bg-secondary cursor-pointer transition-transform duration-300 hover:scale-110"
                  onClick={() => setSelectedResponse(index)}
                >
                  Check Result
                </button>
                <h3 className="font-montserrat">{`Marks scored: ${response.score}`}</h3>
              </li>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default QuizResponse;
