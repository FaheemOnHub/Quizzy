import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash, PlusCircle } from "lucide-react";
import adjustColor from "@/lib/adjustColor";
const MultipleChoicePage = ({ data, onUpdate, customization }) => {
  const [question, setQuestion] = useState(data);
  const [content, setContent] = useState("");
  const [activeDeleteIndex, setActiveDeleteIndex] = useState(null);
  const { selectedFont, primaryTextColor, answerBackground } = customization;
  useEffect(() => {
    console.log(question);
  });
  // Update Question Text
  const handleQuestionChange = (e) => {
    const updatedQuestion = { ...question, question: e.target.value };
    setQuestion(updatedQuestion);
    // onUpdate(updatedQuestion);
  };

  // Update Option Text
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    const updatedQuestion = { ...question, options: updatedOptions };
    setQuestion(updatedQuestion);
    // onUpdate(updatedQuestion);
  };

  // Add Option
  const handleAddOption = () => {
    const updatedOptions = [...question.options, "Add Content"];
    const updatedQuestion = { ...question, options: updatedOptions };
    setQuestion(updatedQuestion);
    // onUpdate(updatedQuestion);
  };

  // Remove Option
  const handleRemoveOption = (index) => {
    const updatedOptions = question.options.filter((_, i) => i !== index);
    const updatedQuestion = { ...question, options: updatedOptions };
    setQuestion(updatedQuestion);
    // onUpdate(updatedQuestion);
  };

  const handleInput = (e) => {
    setContent(e.target.textContent); // Get user-entered text
  };
  return (
    <div>
      <p
        className="text-4xl p-2 font-normal mb-4  bg-transparent max-w-[580px] placeholder outline-none"
        style={{
          fontFamily: `${selectedFont}`,
          color: primaryTextColor,
        }}
        contenteditable="true"
        data-placeholder="Enter your content here..."
        onInput={handleInput}
      ></p>
      <div className="inline-flex flex-col space-y-6 ">
        {/* <div className="inline-flex flex-col space-y-6"> */}
        {question.options.map((option, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 group max-w-[580px]"
            onMouseEnter={() => setActiveDeleteIndex(index)}
            onMouseLeave={() => setActiveDeleteIndex(null)}
          >
            <textarea
              type="text"
              value={option}
              maxLength={160}
              onClick={() => setdeleteVisible("visible")}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              style={{
                fontFamily: selectedFont,
                color: answerBackground,
                borderColor: adjustColor(answerBackground, -30), // Darker border

                backgroundColor: "rgba(255, 255, 255, 0.2)", // Frosted glass
                fieldSizing: "content",
              }}
              className={`flex-grow relative px-8 py-2 rounded-lg border transition-all duration-200 
                                        backdrop-blur-sm hover:bg-opacity-30 hover:scale-105 max-w-[580px] resize-none text-3xl p-2`}
            />
            {activeDeleteIndex === index && (
              <button
                onClick={() => handleRemoveOption(index)}
                className="flex items-center justify-center p-2 rounded-full bg-black 
                           hover:bg-black-600 text-white transition-all duration-200"
              >
                <Trash className="h-6 w-6" />
              </button>
            )}
          </div>
        ))}
        {/* </div> */}
        <button
          className="text-white underline italic text-2xl"
          onClick={handleAddOption}
        >
          Add option
        </button>
      </div>
    </div>
  );
};

export default MultipleChoicePage;
