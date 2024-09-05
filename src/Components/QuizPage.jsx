import React, { useEffect } from "react";
import { useParams } from "react-router";
const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setquiz] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [answers, setanswers] = useState({});
  handleAnswerChange = (questionIndex, answer) => {
    setanswers({
      ...answers,
      [questionIndex]: answer,
    });
  };
  useEffect(() => {
    fetch(`/api/quiz/${id}`).then((res) =>
      res
        .json()
        .then((data) => {
          setquiz(data);
          setloading(false);
        })
        .catch((err) => {
          seterror(err.message);
          setloading(false);
        })
    );
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
      {quiz.questions.map((q, i) => {
        <div key={i} className="question">
          <h3>{q.questionText}</h3>
          {q.type === "multiple-choice" && (
            <div>
              {q.options.map((option, optionIndex) => {
                <div key={optionIndex}>
                  <label>
                    <input
                      type="radio"
                      name={`question-${index}`}
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
                  name={`option-${index}`}
                  value="True"
                  checked={answers[index] == "True"}
                  onChange={() => handleAnswerChange(index, "True")}
                />
                True
              </label>
              <label>
                <input
                  type="radio"
                  name={`option-${index}`}
                  value="False"
                  checked={answers[index] == "False"}
                  onChange={() => handleAnswerChange(index, "False")}
                />
                True
              </label>
            </div>
          )}
          {q.type === "short-answer" && (
            <div>
              <input
                type="text"
                value={answers[index] || ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="your answer here"
              />
            </div>
          )}
        </div>;

      })}
      <button className="submit-quiz" onClick={()=>}></button>
    </div>
  );
};

export default QuizPage;
