import React from "react";

const QuestionForm = ({ question, index, updateQuestion }) => {
  const handleOptionChange = (optionIndex, newValue) => {
    const updatedOptions = question.options.map((option, i) => {
      return i === optionIndex ? newValue : option;
    });
    updateQuestion(index, { ...question, options: updatedOptions });
  };
  return (
    <div className="mb-4">
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
        className="w-full p-2 mb-2"
      />
      <select
        value={question.type}
        onChange={(e) => {
          return updateQuestion(index, { ...question, type: e.target.value });
        }}
        className="p-2 mb-2"
      >
        <option value="multiple-choice">Multiple Choice</option>
        <option value="true-false">True/False</option>
        <option value="short-answer">Short Answer</option>
      </select>

      {/* Render input fields based on question type */}
      {question.type === "multiple-choice" && (
        <div>
          {question.options.map((option, optionIndex) => {
            return (
              <input
                type="text"
                key={optionIndex}
                placeholder={`Option ${optionIndex + 1}`}
                value={option}
                onChange={(e) =>
                  handleOptionChange(optionIndex, e.target.value)
                }
                className="w-full p-2 mb-2"
              />
            );
          })}
        </div>
      )}
      {question.type === "true-false" && (
        <div>
          <input
            type="radio"
            id={`true-${index}`}
            name={`true-false-${index}`}
            value="True"
            checked={question?.options[0] === "True"}
            onChange={() =>
              updateQuestion(index, { ...question, options: ["True", "False"] })
            }
          />
          <label htmlFor={`true-${index}`} className="">
            True
          </label>
          <input
            type="radio"
            id={`false-${index}`}
            name={`true-false-${index}`}
            value="False"
            checked={question?.options[0] === "False"}
            onChange={() =>
              updateQuestion(index, { ...question, options: ["False", "True"] })
            }
          />
          <label htmlFor={`false-${index}`}>False</label>
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
