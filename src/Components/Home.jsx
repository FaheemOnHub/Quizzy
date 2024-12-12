import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionForm from "./QuestionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button as ShadButton } from "@/components/ui/button";
import { Upload, Palette, Type, RotateCcw, Atom, Eye } from "lucide-react";
import QuizPage from "./QuizPage";
import Swal from "sweetalert2";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Button,
} from "@headlessui/react";
import {
  Dialog,
  Transition,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import CustomizeTab from "./CustomizeTab";
import Preview from "./Preview";
const App = () => {
  const [isPreviewMode, setIsPreviewMode] = React.useState(false);
  const togglePreviewMode = () => setIsPreviewMode(!isPreviewMode);
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const clearLocalStorage = () => {
    localStorage.removeItem("quizTitle");
    localStorage.removeItem("quizDescription");
    localStorage.removeItem("quizQuestions");
    localStorage.removeItem("ownerEmail");
    setTitle("");
    setDescription("");
    setownerEmail("");
    setQuestions([]);

    Swal.fire({
      icon: "success",
      title: "Form is cleared",
    });
  };
  const [isEmailValid, setisEmailValid] = useState(false);
  const [currentState, setcurrentState] = useState("quiz");
  const [selectedFont, setselectedFont] = useState("Montserrat");
  const [ownerEmail, setownerEmail] = useState(() => {
    return localStorage.getItem("ownerEmail") || "";
  });
  const [title, setTitle] = useState(() => {
    return localStorage.getItem("quizTitle") || "";
  });
  const [description, setDescription] = useState(() => {
    return localStorage.getItem("quizDescription") || "";
  });

  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("quizQuestions");
    if (savedQuestions.length > 0) {
      return JSON.parse(savedQuestions);
    } else {
      return [
        {
          questionText: "",
          questionImage: "",
          type: "multiple-choice",
          options: [
            { text: "", image: null },
            { text: "", image: null },
          ],
          correctAnswer: null,
        },
      ];
    }
  });
  useEffect(() => {
    localStorage.setItem("ownerEmail", ownerEmail);
    handleEmail(ownerEmail);
  }, [ownerEmail]);
  useEffect(() => {
    localStorage.setItem("quizTitle", title);
  });
  useEffect(() => {
    localStorage.setItem("quizDescription", description);
  });
  useEffect(() => {
    localStorage.setItem("quizQuestions", JSON.stringify(questions));
  }, [questions]);
  const handleEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setisEmailValid(emailPattern.test(email));
  };
  useEffect(() => {
    console.log(questions);
  }, [questions]);
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        type: "multiple-choice",
        options: [
          { text: "", image: null },
          { text: "", image: null },
        ],
        correctAnswer: null,
      },
    ]);
  };
  const updateQuestion = (index, updatedQuestion) => {
    setQuestions(
      questions.map((q, i) => {
        return i === index ? updatedQuestion : q;
      })
    );
  };
  const handleSaveQuiz = async () => {
    if (!isEmailValid) {
      Swal.fire({
        icon: "warning",
        title: "Kindly enter a valid email",
      });
      return;
    }
    if (title.length <= 2) {
      Swal.fire({
        icon: "warning",
        title: "Quiz Title is required",
      });
      return;
    }
    if (questions.length <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Atleast add 1 Question to the Quiz",
      });
      return;
    }
    const quizData = { ownerEmail, title, description, questions };

    console.log(quizData);
    try {
      const response = await fetch("http://localhost:3000/saveQuiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();
      console.log(data);
      clearLocalStorage();
      Swal.fire({
        icon: "success",
        title: "Quiz saved successfully",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to save",
      });
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center  ">
      {currentState === "preview" ? (
        <Preview
          currentState={currentState}
          setcurrentState={setcurrentState}
        />
      ) : (
        <div className="relative py-3 w-1/2 sm:mx-auto ">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl "></div>

          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 border border-red-500 space-y-4">
            <Tabs defaultValue="account" className="w-full ">
              <TabsList className="flex flex-row">
                <TabsTrigger
                  value="quiz"
                  className="w-full "
                  onClick={() => setcurrentState("quiz")}
                >
                  <Atom className="mr-2 h-4 w-4" />
                  Quiz Mode
                </TabsTrigger>
                <TabsTrigger
                  value="customize"
                  className="w-full  "
                  onClick={() => setcurrentState("customize")}
                >
                  <Palette className="mr-2 h-4 w-4" />
                  Customization
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {currentState === "quiz" && (
              <div className=" mx-auto">
                <h1 className="text-2xl font-semibold text-center mb-6 font-montserrat">
                  Create awesome quiz in minutes
                </h1>
                <p className="mt-2 text-center text-gray-600 mb-8 font-montserrat">
                  qu🤯zzy makes it super easy to take quizzes
                </p>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={ownerEmail}
                      onChange={(e) => setownerEmail(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                      // className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-montserrat"
                      placeholder="Enter your Email"
                    />
                    {!isEmailValid && ownerEmail && (
                      <p className="mt-2 text-sm text-red-600 font-montserrat">
                        Please enter a valid email
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 font-montserrat"
                    >
                      Quiz Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 "
                      // className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-montserrat"
                      placeholder="Quiz Title"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 font-montserrat"
                    >
                      Quiz Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 resize-none border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      //className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-montserrat resize-none"
                      placeholder="Quiz Description (optional)"
                      rows="3"
                    ></textarea>
                  </div>

                  <div className="p-2 mt-8 space-y-4 font-montserrat">
                    {questions.map((question, index) => (
                      <QuestionForm
                        key={index}
                        index={index}
                        question={question}
                        updateQuestion={updateQuestion}
                        selectedFont={selectedFont}
                      />
                    ))}
                  </div>

                  <div className="mt-8 flex justify-between">
                    <Button
                      className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
                      onClick={addQuestion}
                    >
                      Add Question
                    </Button>

                    <Button
                      onClick={() => setcurrentState("preview")}
                      className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700 space-x-4
                  "
                    >
                      <Eye className="inline" />
                      <span>Preview</span>
                    </Button>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          Options
                          <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>

                      <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                        <div className="py-1 flex">
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={clearLocalStorage}
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex items-center px-4 py-2 text-sm w-full text-left`}
                              >
                                Clear Form
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={openModal}
                                className={`${
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700"
                                } group flex items-center px-4 py-2 text-sm w-full text-left`}
                              >
                                Save Quiz
                              </button>
                            )}
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                  </div>
                </form>
              </div>
            )}
            {currentState === "customize" && (
              <CustomizeTab
                selectedFont={selectedFont}
                setSelectedFont={setselectedFont}
              />
            )}
          </div>
        </div>
      )}
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition
            as={React.Fragment}
            show={isOpen}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition
                as={React.Fragment}
                show={isOpen}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Save Quiz
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to save this quiz?
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 mr-2"
                      onClick={() => {
                        handleSaveQuiz();
                        closeModal();
                      }}
                    >
                      Save now
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </Transition>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default App;
