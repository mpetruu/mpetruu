import React from 'react';
import { Link } from 'react-router-dom';
import './Banner.css';
import User_component from "./User_component";

const Banner: React.FC = () => {
  return (
    <div className="banner">
      <div className="banner-content">
        <Link to="/" className="banner-logo">
          <span className="logo-dolphin">🐬</span>
          <span className="logo-text">Finsurance</span>
        </Link>

        
        
        <nav className="banner-nav">
          <Link to="/income_and_expenses" className="nav-item">
            <span className="nav-icon">📊</span>
            Income & Expenses
          </Link>
          
          <Link to="/financial-literacy-quiz" className="nav-item">
            <span className="nav-icon">🎯</span>
            Financial Quiz
          </Link>

          <div className="user-content">
          <User_component/>
          </div>

          <Link to="/logout">
          <span className="logout-content"> Logout </span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Banner;
