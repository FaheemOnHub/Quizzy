import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionForm from "./QuestionForm";
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
const App = () => {
  const [isOpen, setIsOpen] = useState(false);

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
    return savedQuestions ? JSON.parse(savedQuestions) : [];
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
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        type: "multiple-choice",
        options: ["", ""],
        correctAnswer: "",
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
    try {
      const response = await fetch(
        "https://quizzy-y6vr.onrender.com/saveQuiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizData),
        }
      );
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
    // <div className="">
    //   <div
    //     id="main"
    //     className="flex flex-col justify-center items-center mt-20"
    //   >
    //     <h1 className="lg:text-4xl text-xl text-blue-300 font-montserrat p-2">
    //       Create awesome quiz in minutes
    //     </h1>
    //     <p className="mt-2 font-montserrat p-2 ">
    //       qu🤯zzy makes it super easy to take quizzes
    //     </p>

    //     <div className="border border-white lg:max-w-[800px] mt-10 p-2 rounded-lg ">
    //       <input
    //         type="email"
    //         id="email"
    //         pattern=".+@example\.com"
    //         size="30"
    //         required
    //         value={ownerEmail}
    //         className="input font-montserrat font-normal mb-4 border border-black mx-auto"
    //         placeholder="Enter your Email:"
    //         onChange={(e) => setownerEmail(e.target.value)}
    //       />
    //       {!isEmailValid && ownerEmail && (
    //         <p className="text-blue-500 m-1 lg:mg-4 font-montserrat alert">
    //           Please enter a valid email
    //         </p>
    //       )}
    //       <input
    //         type="text"
    //         placeholder="Quiz Title"
    //         value={title}
    //         required
    //         onChange={(e) => {
    //           return setTitle(e.target.value);
    //         }}
    //         className=" lg:min-w-96 p-2 w-full mb-4 text-xl font-montserrat rounded-lg"
    //       />
    //       <textarea
    //         name=""
    //         id=""
    //         placeholder="Quiz Description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         className="lg:min-w-96 p-2 w-full text-lg mb-4 font-montserrat resize-none rounded-lg"
    //       ></textarea>
    //       {/* Render each question using the QuestionForm component */}
    //       {questions.map((question, index) => {
    //         return (
    //           <QuestionForm
    //             index={index}
    //             key={index}
    //             question={question}
    //             updateQuestion={updateQuestion}
    //           />
    //         );
    //       })}

    //       <button
    //         onClick={addQuestion}
    //         className="bg-primary p-2 text-white rounded mt-4 font-montserrat"
    //       >
    //         Add Question
    //       </button>
    //       <button
    //         onClick={clearLocalStorage}
    //         className="bg-primary p-2 text-white rounded mt-4 ml-4 font-montserrat"
    //       >
    //         Clear Form
    //       </button>
    //       <button
    //         onClick={handleSaveQuiz}
    //         className="bg-green-500 p-2 text-white rounded mt-4 ml-4 font-montserrat transform rotate-3
    //         "
    //       >
    //         Save Quiz
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
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
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-montserrat"
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
                  className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-montserrat"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 font-montserrat"
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
                  />
                ))}
              </div>

              <div className="mt-8 flex justify-between">
                {/* <button
                  type="button"
                  onClick={addQuestion}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add Question
                </button> */}
                <Button
                  className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700"
                  onClick={addQuestion}
                >
                  Add Question
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

                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                      <div className="py-1">
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
                  </Transition>
                </Menu>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition
            as={React.Fragment}
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
                      Save
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
