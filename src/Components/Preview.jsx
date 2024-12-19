import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import adjustColor from "@/lib/adjustColor";
import getTextColor from "@/lib/getTextColor";
import MultipleChoicePage from "./MultipleChoicePage";
import ContactInfoPage from "./ContactInfoPage";
const PreviewPage = ({
  currentState,
  setcurrentState,
  customization,
  setCustomization,
}) => {
  const [formData, setformData] = useState([
    {
      type: "multipleChoice",
      data: {
        question: "What is React?",
        options: ["Library", "Framework", "Language", "None"],
        correctAnswer: 0,
      },
    },
    {
      type: "contactUs",
      data: {
        heading: "Contact Us",
        description: "Provide your contact details below.",
      },
    },
    {
      type: "dropdown",
      data: {
        question: "Choose your favorite color",
        options: ["Red", "Blue", "Green"],
      },
    },
    {
      type: "multipleChoice",
      data: {
        question: "What is Angular?",
        options: ["Library", "Framework", "Language", "None"],
        correctAnswer: 0,
      },
    },
  ]);
  const {
    logo,
    bgImage,
    bgColor,
    primaryTextColor,
    buttonsColor,
    answerBackground,
    selectedFont,
  } = customization;
  useEffect(() => {
    console.log(customization);
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleSave = () => {
    toast({
      title: "Quiz Saved!",
      description: "Your quiz has been saved successfully.",
    });
    navigate("/");
  };

  const currentQuestion = formData[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < formData.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-fixed transition-all duration-500 rounded-lg flex justify-center   w-full "
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundColor: bgColor,
      }}
    >
      {logo && (
        <img
          src={logo}
          alt="Quiz Logo"
          className="absolute top-5 left-5 h-20 w-20 object-contain"
        />
      )}
      {/* Preview Content */}
      <div className="pt-40 pb-8 mr-96">
        <div className="relative">
          {currentQuestion.type === "multipleChoice" && (
            <MultipleChoicePage
              data={currentQuestion.data}
              customization={customization}
              // onUpdate={(updatedData) =>
              //   updatePageData(currentQuestionIndex, updatedData)
              // }
            />
          )}
          {currentQuestion.type === "contactUs" && (
            <ContactInfoPage
              data={currentQuestion.data}
              customization={customization}
              // onUpdate={(updatedData) =>
              //   updatePageData(currentQuestionIndex, updatedData)
              // }
            />
          )}

          {/* <div className="mb-4">
            <span className="text-3xl font-medium text-white/80 ">
              <BookOpen className="inline" /> {currentQuestionIndex + 1} of{" "}
              {sampleQuestions.length}
            </span>
          </div> */}

          {/* <h2
            className="text-4xl font-normal mb-4 text-white"
            style={{ fontFamily: `${selectedFont}`, color: primaryTextColor }}
          >
            {currentQuestion.question}
          </h2> */}
          {/* <MultipleChoicePage questionData={sampleQuestions} /> */}
          {/* Question Image */}
          {/* {currentQuestion.type === "image" && currentQuestion.imageUrl && (
            <div className="mb-6">
              <img
                src={currentQuestion.imageUrl}
                alt="Question"
                // className="rounded-lg max-h-64 object-contain max-w-full"
                className=" max-h-64 p-4 rounded-lg border border-white/30 hover:bg-white/30 cursor-pointer transition-colors duration-200 bg-white/10 backdrop-blur-sm"
              />
            </div>
          )} */}

          {/* Options */}
          {/* <div className="space-y-3 ">
            {currentQuestion.type === "image-options" ? (
              <div className="grid grid-cols-2 gap-4">
                {currentQuestion.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className=" p-4 rounded-lg border border-white/30 hover:bg-white/30 cursor-pointer transition-colors duration-200 bg-white/10 backdrop-blur-sm"
                  >
                    <img
                      src={option.imageUrl}
                      alt={option.text}
                      className="rounded-lg w-full h-32 object-cover mb-2"
                    />
                    <p className="text-center font-medium text-white">
                      {option.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="inline-flex flex-col space-y-6">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    style={{
                      fontFamily: selectedFont,
                      color: answerBackground,
                      borderColor: adjustColor(answerBackground, -30), // Darker border
                      boxShadow: `0px 4px 6px ${adjustColor(
                        answerBackground,
                        -50
                      )}`, // Subtle shadow
                      backgroundColor: "rgba(255, 255, 255, 0.2)", // Frosted glass
                    }}
                    className={`px-6 py-2 rounded-lg border transition-all duration-200 
                              backdrop-blur-sm hover:bg-opacity-30 hover:scale-105`}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div> */}

          {/* Question Navigation */}
          <div className="flex justify-between items-center pt-4 gap-64">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              style={{
                fontFamily: selectedFont,
                backgroundColor: buttonsColor,
                color: getTextColor(buttonsColor),
              }}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-xl p-6"
            >
              ← Go Back
            </Button>

            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === formData.length - 1}
              style={{
                fontFamily: selectedFont,
                backgroundColor: buttonsColor,
                color: getTextColor(buttonsColor),
              }}
              className="bg-primary/80 hover:bg-primary/90 backdrop-blur-sm text-2xl p-6"
              aria-label=""
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </div>
    // </Card>
  );
};

export default PreviewPage;
