import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PreviewPage = ({ currentState, setcurrentState }) => {
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

  // Sample questions with images for demonstration
  const sampleQuestions = [
    {
      id: 1,
      type: "image",
      question: "What programming language is represented by this logo?",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      options: ["JavaScript", "Python", "Java", "Ruby"],
      backgroundImage:
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    },
    {
      id: 2,
      type: "text",
      question: "Which of these is a front-end framework?",
      options: ["React", "Express", "Django", "Flask"],
      backgroundImage:
        "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    },
    {
      id: 3,
      type: "image-options",
      question: "Which image represents a proper coding setup?",
      options: [
        {
          text: "Setup A",
          imageUrl:
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
        },
        {
          text: "Setup B",
          imageUrl:
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        },
      ],
      backgroundImage:
        "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
    },
  ];

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
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
      className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-500 rounded-lg flex justify-center items-center border border-red-500"
      style={{
        backgroundImage: `url(https://wallpaperaccess.com/full/2849664.jpg)`,
      }}
    >
      {/* Preview Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/30 backdrop-blur-md border-b z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            // onClick={() => navigate("/")}
            onClick={() => setcurrentState("quiz")}
            className="flex items-center gap-2 hover:bg-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Editor
          </Button>
          <div className="flex items-center gap-4">
            <Button
              onClick={handleSave}
              className="flex items-center gap-2 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm"
            >
              <Save className="h-4 w-4" />
              Save Quiz
            </Button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="pt-20 pb-8 px-4">
        <div className="">
          <div className="mb-4">
            <span className="text-3xl font-medium text-white/80 ">
              <BookOpen className="inline" /> {currentQuestionIndex + 1} of{" "}
              {sampleQuestions.length}
            </span>
          </div>

          <h2 className="text-4xl font-normal mb-4 text-white">
            {currentQuestion.question}
          </h2>

          {/* Question Image */}
          {currentQuestion.type === "image" && currentQuestion.imageUrl && (
            <div className="mb-6">
              <img
                src={currentQuestion.imageUrl}
                alt="Question"
                // className="rounded-lg max-h-64 object-contain max-w-full"
                className=" max-h-64 p-4 rounded-lg border border-white/30 hover:bg-white/30 cursor-pointer transition-colors duration-200 bg-white/10 backdrop-blur-sm"
              />
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 ">
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
                    className=" px-6 py-2 rounded-lg border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/30 transition-colors duration-200 w-full "
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Question Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 text-2xl p-6"
            >
              ← Go Back
            </Button>
            {/* <span className="text-sm text-white font-medium">
              {currentQuestionIndex + 1} of {sampleQuestions.length}
            </span> */}
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === sampleQuestions.length - 1}
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
