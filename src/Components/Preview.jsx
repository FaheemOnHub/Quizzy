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
import TextInput from "./TextInput";
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
      type: "textInput",
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
      className="min-h-screen relative bg-cover bg-center bg-fixed transition-all duration-500 rounded-lg flex justify-center items-center w-full "
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
      <div className="pt-40 pb-8 mr-96 pl-8">
        <div className="">
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
          {currentQuestion.type === "textInput" && (
            <TextInput
              customization={customization}
              placeholder={"Type your answer here"}
            />
          )}

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
