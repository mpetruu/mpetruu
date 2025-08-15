import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";  
import Chatbot from "../components/Chatbot";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import "./Home.css";
import { FaChartLine, FaQuestionCircle, FaLightbulb, FaLifeRing, FaWater } from 'react-icons/fa';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isReading, setIsReading] = useState(false);

  const speakWelcome = () => {
    const message = "Welcome to Finsurance HomePage, press B to navigate the webpages";
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  };

  const readMessage = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    setIsReading(true);
    const message = `Cowabunga! Fin the FinTech Dolphin here, welcoming you aboard our financial well-being site! 
    Get ready to ride the tidal wave of knowledge with our fin-tastic resources. Here's the scoop:
    
    Income & Expenses Page – Dive into your personal finances by recording your income and expenses. Once you've filled in your data, feed it to me in our chatbot, and I'll flip some splashy ideas your way on how to invest and plan better!

    Fin-tastic Quiz – Test your money smarts with our fin-tastic quiz specially made for finance enthusiasts. It's packed with real-life Canadian finance scenarios—just like a guided swim through the reef of RRSPs, TFSAs, and more!

    If you ever feel lost at sea, just click the chat button at the bottom-right corner, and yours truly will pop up with real-time advice. Let's make waves together and keep your finances afloat!

    Surf's up, friends!`;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.onend = () => setIsReading(false);
    utterance.rate = 0.9; // Slightly slower rate for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch for a more energetic tone
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (location.pathname === '/') {
      speakWelcome();
    }

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        readMessage();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [location.pathname, isReading]);

  return (
    <>
      <Banner />
      <div className="home-container">
        <div className="home-content">
          {/* Hero Section */}
          <div className="hero-section">
            <h1 className="hero-title">
              Navigate Your Financial Journey
            </h1>
            <p className="hero-subtitle">
              Let Fin guide you through the waters of financial wellness
            </p>
          </div>

          {/* Existing Fin Message Container */}
          <div className="fin-message-container">
            <div className="fin-avatar-placeholder">
              {/* Placeholder for Fin's full body image */}
            </div>
            <div className="fin-message-bubble">
              <button 
                className="read-message-button" 
                onClick={readMessage}
                aria-label={isReading ? "Stop reading" : "Read message"}
              >
                {isReading ? '🔊' : '🔈'}
              </button>
              <div className="water-drops">
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
                <div className="water-drop"></div>
              </div>
              <p>Cowabunga! 🤙 Fin the FinTech Dolphin here, welcoming you aboard our financial well-being site! 🐬</p>
              <p>Get ready to ride the tidal wave of knowledge with our fin-tastic resources. Here's the scoop:</p>
              <ul>
                <li><strong>Income & Expenses Page</strong> – Dive into your personal finances by recording your income and expenses. Once you've filled in your data, feed it to me in our chatbot, and I'll flip some splashy ideas your way on how to invest and plan better!</li>
                <li><strong>Fin-tastic Quiz</strong> – Test your money smarts with our fin-tastic quiz specially made for finance enthusiasts. It's packed with real-life Canadian finance scenarios—just like a guided swim through the reef of RRSPs, TFSAs, and more!</li>
              </ul>
              <p>If you ever feel lost at sea, just click the chat button at the bottom-right corner, and yours truly will pop up with real-time advice. Let's make waves together and keep your finances afloat!</p>
              <p>Surf's up, friends! 🌊</p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            <Link to="/income_and_expenses" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <FaChartLine />
                <div className="bubble-animation" />
              </div>
              <h3>Budget Your Finances</h3>
              <p>Budget and plan better so you can enjoy and relax tomorrow more! </p>
            </Link>

            <Link to="/financial-literacy-quiz" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="feature-icon">
                <FaQuestionCircle />
                <div className="bubble-animation" />
              </div>
              <h3>Test Your Knowledge</h3>
              <p>Challenge yourself with our fin-tastic financial literacy quiz</p>
            </Link>

            <div className="feature-card">
              <div className="feature-icon">
                <FaLightbulb />
                <div className="bubble-animation" />
              </div>
              <h3>Smart Insights</h3>
              <p>Get personalized financial tips and recommendations from Fin</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <FaLifeRing />
                <div className="bubble-animation" />
              </div>
              <h3>24/7 Support</h3>
              <p>Chat with Fin anytime for financial guidance and assistance</p>
            </div>
          </div>

          

          {/* Getting Started Section */}
          {/* Wave Divider */}
        </div>
        <div className="wave-divider">
            <div className="wave-animation">
              <div className="wave wave1"></div>
              <div className="wave wave2"></div>
              <div className="wave wave3"></div>
            </div>
            <h2 className="wave-tagline">Make waves in finance</h2>
          </div>
      </div>
      
      
      <Chatbot />
    </>
  );
};

export default Home;
