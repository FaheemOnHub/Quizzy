import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setquiz] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [answers, setanswers] = useState({});
  const [email, setemail] = useState("");
  const [isEmailValid, setisEmailValid] = useState(false);

  const handleEmail = (email) => {
    setemail(email);
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setisEmailValid(emailPattern.test(email));
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
    return (
      <div className="flex justify-center items-center mt-20 ">
        <div class="loading loading-spinner">Loading...</div>
      </div>
    );
  }
  if (error) {
    return <p>Error:{error}</p>;
  }
  return (
    <div className="flex flex-col justify-center items-center border border-white rounded-xl max-w-[600px] xl:max-w-[900px]  mx-auto gap-4 p-4 m-10  bg-white text-black">
      <h1 className="text-xl font-montserrat font-thin">{`Quiz Title: ${quiz.title}`}</h1>

      <p className="text-2xl text-primary font-montserrat font-light">{`Quiz Description: ${quiz.description}`}</p>
      <div>
        <input
          type="email"
          id="email"
          pattern=".+@example\.com"
          size="30"
          required
          className="input font-montserrat font-normal"
          placeholder="Enter your Email:"
          onChange={(e) => handleEmail(e.target.value)}
        />
        {!isEmailValid && email && (
          <p className="text-blue-500 mt-4 font-montserrat alert">
            Please enter a valid email
          </p>
        )}
      </div>
      {isEmailValid && (
        <>
          {quiz.questions.map((q, i) => (
            <div
              key={i}
              className="question font-montserrat border border-black rounded-lg p-4 min-w-[400px]"
            >
              <h3 className="text-2xl font-montserrat mb-4">
                {q.questionText}
              </h3>
              {q.type === "multiple-choice" && (
                <div className="card flex flex-row flex-wrap gap-5">
                  {q.options.map((option, optionIndex) => {
                    return (
                      <div key={optionIndex} className="">
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
                      </div>
                    );
                  })}
                </div>
              )}
              {q.type === "true-false" && (
                <div className="">
                  <label className="p-4">
                    <input
                      type="radio"
                      name={`option-${i}`}
                      value="True"
                      checked={answers[i] == "True"}
                      onChange={() => handleAnswerChange(i, "True")}
                    />
                    True
                  </label>
                  <label className="p-4">
                    <input
                      type="radio"
                      name={`option-${i}`}
                      value="False"
                      checked={answers[i] == "False"}
                      onChange={() => handleAnswerChange(i, "False")}
                    />
                    False
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
        </>
      )}
    </div>
  );
};

export default QuizPage;
