import React from "react";
import ImageInput from "./ImageInput";
import { Check } from "lucide-react";

const QuestionForm = ({ question, index, updateQuestion, selectedFont }) => {
  const handleOptionChange = (optionIndex, key, value) => {
    const updatedOptions = question.options.map((option, i) =>
      i === optionIndex ? { ...option, [key]: value } : option
    );
    updateQuestion(index, { ...question, options: updatedOptions });
  };
  const handleCorrectAnswerChange = (correctOption) => {
    return updateQuestion(index, {
      ...question,
      correctAnswer: correctOption,
    });
  };
  return (
    <div className="mb-4 space-y-4">
      <h2
        className={`text-lg font-semibold text-gray-900`}
        style={{ fontFamily: selectedFont }}
      >
        Question {index + 1}
      </h2>
      <input
        type="text"
        placeholder="Question"
        value={question.questionText}
        onChange={(e) => {
          return updateQuestion(index, {
            ...question,
            questionText: e.target.value,
          });
        }}
        className="mt-1 block w-full bg-gray-50 rounded-lg px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
        style={{ fontFamily: selectedFont }}
      />
      <select
        value={question.type}
        onChange={(e) => {
          return updateQuestion(index, { ...question, type: e.target.value });
        }}
        className="p-2 mb-2 "
      >
        <option value="multiple-choice" className="font-montserrat">
          Multiple Choice
        </option>
        <option value="true-false" className="font-montserrat">
          True/False
        </option>
        <option value="short-answer" className="font-montserrat">
          Short Answer
        </option>
      </select>

      {/* Render input fields based on question type */}
      {question.type === "multiple-choice" && (
        <div>
          {question.options.map((option, optionIndex) => {
            return (
              <div>
                <ImageInput id={optionIndex} onImageAdd={handleOptionChange} />
                <div className="flex items-center mb-2 mx-auto justify-between">
                  <input
                    type="text"
                    key={optionIndex}
                    placeholder={`Option ${optionIndex + 1}`}
                    value={option.text}
                    onChange={(e) =>
                      handleOptionChange(optionIndex, "text", e.target.value)
                    }
                    className=" mt-1 block w-full bg-gray-50 rounded-lg px-4 py-3 border focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                    style={{ fontFamily: selectedFont }}
                  />

                  <div className="flex items-center justify-center">
                    <input
                      type="radio"
                      name={`correct-answer-${index}`}
                      id={`correct-answer-${index}-${optionIndex}`}
                      checked={question.correctAnswer === option.text}
                      onChange={() => handleCorrectAnswerChange(option.text)}
                      // className="w-6"
                      className="peer hidden"
                    />
                    <label
                      htmlFor={`correct-answer-${index}-${optionIndex}`}
                      className="w-10 h-10 rounded-full border-2  flex items-center justify-center cursor-pointer m-4
               peer-checked:border-green-500 peer-checked:bg-green-500"
                    >
                      {question.correctAnswer === option.text && (
                        <Check className="w-5 h-5" />
                      )}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            onClick={() =>
              updateQuestion(index, {
                ...question,
                options: [...question.options, ""],
              })
            }
            className="bg-secondary p-1 text-white rounded"
          >
            Add Option
          </button>
          <button
            onClick={() =>
              updateQuestion(index, {
                ...question,
                options: [...question.options.slice(0, -1)],
              })
            }
            className="bg-secondary p-1 text-white rounded ml-10"
          >
            Delete Option
          </button>
        </div>
      )}
      {question.type === "true-false" && (
        <div className="">
          <input
            type="radio"
            id={`true-${index}`}
            name={`true-false-${index}`}
            value="True"
            checked={question?.options[0].text === "True"}
            onChange={() => {
              updateQuestion(index, {
                ...question,
                options: [{ text: "True" }, { text: "False" }],
                correctAnswer: "True",
              });
            }}
          />
          <label htmlFor={`true-${index}`} className="p-4">
            True
          </label>
          <input
            type="radio"
            id={`false-${index}`}
            name={`true-false-${index}`}
            value="False"
            checked={question?.options[0].text === "False"}
            onChange={() => {
              updateQuestion(index, {
                ...question,
                options: [{ text: "False" }, { text: "True" }],
                correctAnswer: "False",
              });
            }}
          />
          <label htmlFor={`false-${index}`} className="p-4">
            False
          </label>
        </div>
      )}
      {question.type === "short-answer" && (
        <input
          type="text"
          placeholder="Short Answer"
          value={question.options[0]}
          onChange={(e) =>
            updateQuestion(index, { ...question, options: [e.target.value] })
          }
          className="w-full p-2 mb-2"
        />
      )}
    </div>
  );
};

export default QuestionForm;
