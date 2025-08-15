import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/income_and_expenses">Income and Expenses</Link>
        </li>
        <li>
          <Link to="/financial-literacy-quiz">Financial Literacy Quiz</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
