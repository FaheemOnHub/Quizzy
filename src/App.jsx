import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import QuizPage from "./Components/QuizPage";
import AdminDashboard from "./Pages/adminDashboard.jsx";
import Swal from "sweetalert2";
function handelSettings() {
  Swal.fire({
    icon: "warning",
    title: "working on it 👨🏼‍🔧",
  });
}
const App = () => {
  return (
    <Router>
      <div id="main">
        <div
          id="navbar"
          className="flex flex-row justify-between items-center p-3 m-auto  lg:ml-20 lg:mr-20  "
        >
          <a href="/">
            <h3 className="lg:text-4xl text-xl font-montserrat text-primary">
              qu🤯zzy
            </h3>
          </a>
          <div className="lg:text-4xl text-xl" onClick={() => handelSettings()}>
            <ion-icon name="settings-outline"></ion-icon>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<QuizPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
