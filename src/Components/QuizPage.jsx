import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setquiz] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [answers, setanswers] = useState({});
  const [email, setemail] = useState("");

  const handleEmail = (email) => {
    setemail(email);
  };
  const handleAnswerChange = (questionIndex, answer) => {
    setanswers({
      ...answers,
      [questionIndex]: answer,
    });
  };
  const handleSubmitQuiz = async () => {
    const submitData = { answers, email };
    try {
      const response = await fetch(
        `http://localhost:3000/api/quiz/${id}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submitData),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(`Error in submitting the quiz,${error.message}`);
    }
  };
  useEffect(() => {
    console.log("Quiz ID:", id); // Log the id value to confirm
    fetch(`http://localhost:3000/api/quiz/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setquiz(data);
        setloading(false);
        console.log(data);
      })
      .catch((err) => {
        console.error(err.message);
        seterror(err.message);
        setloading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading quiz...</p>;
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div>
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>
      <div>
        <label htmlFor="email">Enter your example.com email:</label>

        <input
          type="email"
          id="email"
          pattern=".+@example\.com"
          size="30"
          required
          onChange={(e) => handleEmail(e.target.value)}
        />
      </div>
      {quiz.questions.map((q, i) => (
        <div key={i} className="question">
          <h3>{q.questionText}</h3>
          {q.type === "multiple-choice" && (
            <div>
              {q.options.map((option, optionIndex) => {
                <div key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={option}
                      checked={answers[i] === option}
                      onChange={() => handleAnswerChange(i, option)}
                    />
                    {option}
                  </label>
                </div>;
              })}
            </div>
          )}
          {q.type === "true-false" && (
            <div>
              <label>
                <input
                  type="radio"
                  name={`option-${i}`}
                  value="True"
                  checked={answers[i] == "True"}
                  onChange={() => handleAnswerChange(i, "True")}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={`option-${i}`}
                  value="False"
                  checked={answers[i] == "False"}
                  onChange={() => handleAnswerChange(i, "False")}
                />
                True
              </label>
            </div>
          )}
          {q.type === "short-answer" && (
            <div>
              <input
                type="text"
                value={answers[i] || ""}
                onChange={(e) => handleAnswerChange(i, e.target.value)}
                placeholder="your answer here"
              />
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmitQuiz}
        className="bg-green-500 p-2 text-white rounded mt-4 ml-4"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
