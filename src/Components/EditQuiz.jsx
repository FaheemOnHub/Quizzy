import React, { useEffect } from "react";
import { useState } from "react";
import { Label, Field } from "@headlessui/react";
import { Trash2, Plus, ArrowLeft, Save } from "lucide-react";
// import QuestionForm from "./QuestionForm";
import Swal from "sweetalert2";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Alert, AlertDescription } from "./ui/alert";
const EditQuiz = ({ quizData: initialData, onSave, onCancel }) => {
  const [quizData, setdata] = useState(initialData || {});
  const [title, settitle] = useState(quizData.title || "");
  const [description, setdescription] = useState(quizData.description || "");
  const [questions, setQuestions] = useState(quizData.questions || []);

  const handleTitleChange = (newTitle) => {
    setdata((quizData) => ({
      ...quizData,
      title: newTitle,
    }));
    settitle(newTitle);
  };
  // const handleQuestionChange = (index, newQuestion) => {
  //   const updatedQuestion = [...questions];
  //   updatedQuestion[index].questionText = newQuestion;
  //   setQuestions(updatedQuestion);
  //   setdata((data) => ({
  //     ...data,
  //     questions: updatedQuestion,
  //   }));
  // };
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
    setdata((quizData) => ({ ...quizData, questions: updatedQuestions }));
  };
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionsText: "",
        type: "multiple-choice",
        options: ["", ""],
        correctAnswer: "",
      },
    ]);
  };
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    setdata((data) => ({ ...data, questions: updateQuestion }));
  };
  const handleAnswerChange = (index, newAnswer) => {
    const updatedQuestion = [...questions];
    updatedQuestion[index].correctAnswer = newAnswer;
    setQuestions(updatedQuestion);
    setdata((data) => ({
      ...data,
      questions: updatedQuestion,
    }));
  };
  const handleOptionChange = (optionIndex, newOption, question, index) => {
    const updatedOption = question.options.map((option, index) => {
      return index === optionIndex ? newOption : option;
    });
    const updatedQuestion = [...questions];
    updatedQuestion[index].options = updatedOption;
    setQuestions(updatedQuestion);
    setdata((data) => ({
      ...data,
      questions: updatedQuestion,
    }));
  };
  const updateQuestion = (index, updatedQuestion) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
    setdata((data) => ({
      ...data,
      questions: updatedQuestions,
    }));
  };

  const saveQuiz = async () => {
    try {
      const response = await fetch(
        `https://quizzy-y6vr.onrender.com/saveQuiz/updateQuiz/${quizData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to save the quiz");
      }
      const result = await response.json();
      console.log(result.updateQuiz);
      Swal.fire({
        title: "Success!",
        text: "Quiz saved successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      await onSave(result.updateQuiz);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <div className="edit-quiz-container quiz-card">
    //   <h2 className="font-montserrat text-xl">Edit Quiz</h2>
    //   <div className="flex flex-row justify-between">
    //     <button
    //       onClick={() => onCancel()}
    //       className=" border rounded-lg shadow-lg p-2 mt-2"
    //     >
    //       Back
    //     </button>
    //     <button onClick={saveQuiz} className="btn-primary  p-2">
    //       Save Quiz
    //     </button>
    //   </div>

    //   <Field className="mt-4">
    //     <Label className="font-montserrat text-lg ">Quiz Title:</Label>
    //     <input
    //       type="text"
    //       placeholder="Quiz Title"
    //       value={title}
    //       required
    //       onChange={(e) => {
    //         return handleTitleChange(e.target.value);
    //       }}
    //       className=" lg:min-w-96 p-2 w-full mb-4 mt-4 text-xl font-montserrat rounded-lg input border border-black"
    //     />
    //   </Field>

    //   <textarea
    //     name=""
    //     id=""
    //     placeholder="Quiz Description"
    //     value={description}
    //     onChange={(e) => setdescription(e.target.value)}
    //     className="lg:min-w-96 p-2 w-full text-lg mb-4 font-montserrat resize-none rounded-lg input"
    //   />
    //   <h3 className="font-montserrat text-xl">Edit Questions</h3>
    //   {questions.map((q, index) => {
    //     return (
    //       <div className="flex flex-col mt-2 mb-2" key={index}>
    //         <input
    //           type="text"
    //           value={q.questionText}
    //           onChange={(e) => handleQuestionChange(index, e.target.value)}
    //           className="w-full p-4 mb-2 font-montserrat "
    //         />
    //         {q.type === "multiple-choice" && (
    //           <div>
    //             {q.options.map((option, optionIndex) => {
    //               return (
    //                 <div
    //                   className="flex items-center mb-2 mx-auto"
    //                   key={optionIndex}
    //                 >
    //                   <span className="p-2 mb-2 border rounded-full input mt-1">
    //                     {optionIndex + 1}
    //                   </span>
    //                   <input
    //                     type="text"
    //                     key={optionIndex}
    //                     placeholder={`Option ${optionIndex + 1}`}
    //                     value={option}
    //                     onChange={(e) =>
    //                       handleOptionChange(
    //                         optionIndex,
    //                         e.target.value,
    //                         q,
    //                         index
    //                       )
    //                     }
    //                     className="w-full p-2 mb-2 font-montserrat"
    //                   />
    //                   <div className="flex items-center justify-center">
    //                     <label className="ml-2 text-sm font-medium font-mon text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 min-w-[100px] rounded-lg ">
    //                       <input
    //                         type="radio"
    //                         name={`correct-answer-${index}`}
    //                         id={`correct-answer-${index}`}
    //                         checked={q.correctAnswer === option}
    //                         onChange={() => handleAnswerChange(index, option)}
    //                         className="w-6"
    //                       />
    //                       Correct
    //                     </label>
    //                   </div>
    //                 </div>
    //               );
    //             })}
    //             <button
    //               onClick={() =>
    //                 updateQuestion(index, {
    //                   ...q,
    //                   options: [...q.options, ""],
    //                 })
    //               }
    //               className="bg-secondary p-1 text-white rounded"
    //             >
    //               Add Option
    //             </button>
    //             <button
    //               onClick={() =>
    //                 updateQuestion(index, {
    //                   ...q,
    //                   options: [...q.options.slice(0, -1)],
    //                 })
    //               }
    //               className="bg-secondary p-1 text-white rounded ml-10"
    //             >
    //               Delete Option
    //             </button>
    //           </div>
    //         )}
    //         {q.type === "true-false" && (
    //           <div className="">
    //             <input
    //               type="radio"
    //               id={`true-${index}`}
    //               name={`true-false-${index}`}
    //               value="True"
    //               checked={q?.options[0] === "True"}
    //               onChange={() => {
    //                 updateQuestion(index, {
    //                   ...q,
    //                   options: ["True", "False"],
    //                   correctAnswer: "True",
    //                 });
    //               }}
    //             />
    //             <label htmlFor={`true-${index}`} className="p-4">
    //               True
    //             </label>
    //             <input
    //               type="radio"
    //               id={`false-${index}`}
    //               name={`true-false-${index}`}
    //               value="False"
    //               checked={q?.options[0] === "False"}
    //               onChange={() => {
    //                 updateQuestion(index, {
    //                   ...q,
    //                   options: ["False", "True"],
    //                   correctAnswer: "False",
    //                 });
    //               }}
    //             />
    //             <label htmlFor={`false-${index}`} className="p-4">
    //               False
    //             </label>
    //           </div>
    //         )}
    //         {q.type === "short-answer" && (
    //           <input
    //             type="text"
    //             placeholder="Short Answer"
    //             value={q.options[0]}
    //             onChange={(e) =>
    //               updateQuestion(index, {
    //                 ...q,
    //                 options: [e.target.value],
    //               })
    //             }
    //             className="w-full p-2 mb-2"
    //           />
    //         )}
    //       </div>
    //     );
    //   })}
    // </div>
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Quiz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title">Quiz Title</label>
          <Input
            id="title"
            type="text"
            placeholder="Quiz Title"
            value={title}
            required
            onChange={(e) => {
              return handleTitleChange(e.target.value);
            }}
            className="text-xl font-montserrat "
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="description">Quiz Description</label>
          <Textarea
            id="description"
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            className=" p-2 text-xl font-montserrat resize-none"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Questions</h3>
          {questions.map((q, index) => {
            return (
              <Card className="p-4">
                <div className="flex items-center mb-2 justify-between">
                  <h4 className="text-lg font-medium">Question {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={q.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
                  }
                  className=" font-montserrat mb-2"
                />
                <RadioGroup
                  value={q.type}
                  onValueChange={(value) =>
                    handleQuestionChange(index, "type", value)
                  }
                  className="flex space-x-4 mb-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="multiple-choice"
                      id={`mc-${index}`}
                    />
                    <Field>
                      <Label htmlFor={`mc-${index}`}>Multiple Choice</Label>
                    </Field>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="true-false" id={`tf-${index}`} />
                    <Field>
                      <Label htmlFor={`tf-${index}`}>True/False</Label>
                    </Field>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="short-answer" id={`sa-${index}`} />
                    <Field>
                      <Label htmlFor={`sa-${index}`}>Short Answer</Label>
                    </Field>
                  </div>
                </RadioGroup>
                {q.type === "multiple-choice" && (
                  <div className="space-y-2">
                    {q.options.map((option, optionIndex) => {
                      return (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <Input
                            className="font-montserrat"
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...q.options];
                              newOptions[optionIndex] = e.target.value;
                              handleQuestionChange(
                                index,
                                "options",
                                newOptions
                              );
                            }}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <RadioGroup>
                            <RadioGroupItem
                              className=""
                              checked={q.correctAnswer === option}
                              onClick={() =>
                                handleQuestionChange(
                                  index,
                                  "correctAnswer",
                                  option
                                )
                              }
                            />
                          </RadioGroup>
                        </div>
                      );
                    })}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleQuestionChange(index, "options", [
                          ...q.options,
                          "",
                        ])
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Option
                    </Button>
                  </div>
                )}
                {q.type === "true-false" && (
                  <RadioGroup
                    value={q.correctAnswer}
                    onValueChange={(value) =>
                      handleQuestionChange(index, "correctAnswer", value)
                    }
                    className="flex space-x-4 space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="True" id={`true-${index}`} />
                      <Field>
                        <Label htmlFor={`true-${index}`}>True</Label>
                      </Field>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="False" id={`false-${index}`} />
                      <Field>
                        <Label htmlFor={`false-${index}`}>False</Label>
                      </Field>
                    </div>
                  </RadioGroup>
                )}
                {q.type === "short-answer" && (
                  <Input
                    value={q.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                    placeholder="Correct Answer"
                  />
                )}
              </Card>
            );
          })}
          <Button onClick={addQuestion} variant="outline">
            <Plus className="h-4 w-4 mr-2" /> Add Question
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <Button onClick={saveQuiz}>
          <Save className="h-4 w-4 mr-2" /> Save Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditQuiz;
