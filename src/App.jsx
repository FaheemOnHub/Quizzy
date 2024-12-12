import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";

import Home from "./Components/Home.jsx";
import QuizPage from "./Components/QuizPage";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Login from "./Components/Login.jsx";
import Swal from "sweetalert2";
import Signup from "./Components/ui/Signup.jsx";
import { Link } from "react-router-dom";
import LandingPage from "./Components/LandingPage.jsx";

import CustomizeTab from "./Components/CustomizeTab.jsx";
import CustomColorPicker from "./Components/trial.jsx";
import PreviewPage from "./Components/Preview.jsx";
function handelSettings() {
  Swal.fire({
    icon: "warning",
    title: "working on it 👨🏼‍🔧",
  });
}
const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect to login page
};
const App = () => {
  return (
    <Router>
      <div id="main">
        {/* <div
          id="navbar"
          className="flex flex-row justify-between items-center p-3 m-auto  lg:ml-20 lg:mr-20  "
        >
          <a href="/">
            <h3 className="lg:text-4xl text-xl font-montserrat text-primary">
              qu🤯zzy
            </h3>
          </a>
          <button onClick={handleLogout} className="border rounded-lg p-2">
            Logout
          </button>
          <div className="">
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Options
                <ChevronDownIcon className="size-4 fill-white/60" />
              </MenuButton>

              <MenuItems
                transition
                anchor="bottom end"
                className=" mt-4 w-52 origin-top-right rounded-xl border border-black/10 bg-black/50 p-2 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
              >
                <MenuItem>
                  <a href="/admin">
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                      <PencilIcon className="size-4 fill-white/30" />
                      Admin Panel
                      <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                        ⌘A
                      </kbd>
                    </button>
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="/login">
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                      <PencilIcon className="size-4 fill-white/30" />
                      Login Panel
                      <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                        ⌘A
                      </kbd>
                    </button>
                  </a>
                </MenuItem>
                <MenuItem>
                  <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                    <Square2StackIcon className="size-4 fill-white/30" />
                    not yet working!
                    <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">
                      ⌘D
                    </kbd>
                  </button>
                </MenuItem>
                <div className="my-1 h-px bg-white/5" />
              </MenuItems>
            </Menu>
          </div>
        </div> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/interface" element={<Home />} />
          <Route path="/quiz/:id" element={<QuizPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/customize" element={<CustomizeTab />} />
          <Route path="/test" element={<CustomColorPicker />} />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
