import React from "react";

const adminDashboard = () => {
  return (
    <div className="main">
      {/* sidebar */}
      <div class="sidebar bg-light-gray border border-gray-600 rounded-lg">
        <ul class="nav-links">
          <li>
            <a href="/admin">
              <i class="icon-quiz"></i> All Quizzes
            </a>
          </li>
          <li>
            <i class="icon-create"></i> Create New Quiz
          </li>
          <li>
            <i class="icon-settings"></i> Account Settings
          </li>
        </ul>
      </div>
      {/* main-content */}
      <div class="content">
        <div class="header">
          <h1 className="font-montserrat text-2xl p-4">All Quizzes...</h1>
          <input
            type="text"
            className="search-bar input p-4 m-4"
            placeholder="Search by quiz title..."
          />
        </div>
        <div class="quiz-grid">
          <div class="quiz-card">
            <h3>Quiz Title 1</h3>
            <p>5 respondents</p>
            <p>Created on: 2024-09-01</p>
            <button>View Responses</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default adminDashboard;
