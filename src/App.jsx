import React, { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home.jsx";
import QuizPage from "./Components/QuizPage";
import AdminDashboard from "./Pages/adminDashboard.jsx";
const App = () => {
  return (
    <Router>
      <div id="main">
        <div
          id="navbar"
          className="flex flex-row justify-between items-center p-4 m-auto ml-20 mr-20"
        >
          <a href="/">
            <h3 className="text-4xl font-montserrat text-primary">qu🤯zzy</h3>
          </a>
          <div className="text-4xl">
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
