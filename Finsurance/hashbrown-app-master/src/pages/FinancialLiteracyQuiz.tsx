import React, { useState, useEffect } from 'react';
import Banner from "../components/Banner";
import Chatbot from "../components/Chatbot";
import "./FinancialLiteracyQuiz.css";

interface AttemptTracker {
  [key: number]: number;
}

const FinancialLiteracyQuiz: React.FC = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isDolphinsSwimming, setIsDolphinsSwimming] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [attempts, setAttempts] = useState<AttemptTracker>({});
  const [showResults, setShowResults] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    
    // Only increment attempts if we haven't gotten the correct answer yet
    const isCorrectAnswer = (currentQuestion === 1 && answer === 'B') ||
                          (currentQuestion >= 2 && currentQuestion <= 6 && answer === 'A');
                          
    // Check if this question has already been answered correctly
    const hasCorrectAnswer = Object.entries(attempts)
      .some(([q, _]) => parseInt(q) === currentQuestion && isCorrectForQuestion(currentQuestion));

    // Only increment attempts if we haven't gotten the correct answer yet for this question
    if (!hasCorrectAnswer) {
      setAttempts(prev => ({
        ...prev,
        [currentQuestion]: (prev[currentQuestion] || 0) + 1
      }));
    }
  };

  // Update isCorrectForQuestion to not require previous attempts
  const isCorrectForQuestion = (questionNumber: number) => {
    const correctAnswers = {
      1: 'B',
      2: 'A',
      3: 'A',
      4: 'A',
      5: 'A',
      6: 'A'
    };
    
    return selectedAnswer === correctAnswers[questionNumber as keyof typeof correctAnswers];
  };

  const handleStartClick = () => {
    // Reset all quiz state
    setSelectedAnswer(null);
    setCurrentQuestion(1);
    
    // Trigger dolphin animation
    setIsDolphinsSwimming(true);
    const dolphins = document.querySelectorAll('.dolphin');
    dolphins.forEach((dolphin) => {
      const swimX = Math.random() * 400 - 200;
      const swimAngle = Math.random() * 60 - 30;
      (dolphin as HTMLElement).style.setProperty('--swim-x', `${swimX}px`);
      (dolphin as HTMLElement).style.setProperty('--swim-angle', `${swimAngle}deg`);
    });
    
    // Delay the quiz start until after animation
    setTimeout(() => {
      setQuizStarted(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion === 5 && selectedAnswer === 'A') {
      setShowResults(true);
    } else if (selectedAnswer === 'B' && currentQuestion === 1) {
      setCurrentQuestion(2);
      setSelectedAnswer(null);
    } else if (selectedAnswer === 'A' && currentQuestion === 2) {
      setCurrentQuestion(3);
      setSelectedAnswer(null);
    } else if (selectedAnswer === 'A' && currentQuestion === 3) {
      setCurrentQuestion(4);
      setSelectedAnswer(null);
    } else if (selectedAnswer === 'A' && currentQuestion === 4) {
      setCurrentQuestion(5);
      setSelectedAnswer(null);
    } else if (selectedAnswer === 'A' && currentQuestion === 5) {
      setCurrentQuestion(6);
      setSelectedAnswer(null);
    }
  };

  const resetQuiz = () => {
    // Reset all state
    setSelectedAnswer(null);
    setQuizStarted(false);
    setCurrentQuestion(1);
    setAttempts({});
    setShowResults(false);
    
    // Refresh the page
    window.location.reload();
  };

  const getFeedbackMessage = () => {
    if (!selectedAnswer) return null;

    const isCorrectAnswer = (currentQuestion === 1 && selectedAnswer === 'B') ||
                           (currentQuestion >= 2 && currentQuestion <= 6 && selectedAnswer === 'A');

    // Update selector to target only the question avatar
    const avatarPlaceholder = document.querySelector('.question-fin-avatar');
    if (avatarPlaceholder) {
      if (!isCorrectAnswer) {
        avatarPlaceholder.classList.add('incorrect');
        avatarPlaceholder.classList.remove('correct');
      } else {
        avatarPlaceholder.classList.add('correct');
        avatarPlaceholder.classList.remove('incorrect');
      }
    }

    if (currentQuestion === 1) {
      if (selectedAnswer === 'B') {
        return (
          <div className="feedback-message correct">
            <div className="happy-dolphin-container">
              🐬
            </div>
            <h3>Correct Answer!</h3>
            <p>Since Emily is in a lower tax bracket now and expects her income to increase in the future, using a TFSA makes more sense. She won't get a big immediate tax break from an RRSP at her current income level, and withdrawals from a TFSA are tax-free later.</p>
            <h4>Why the Other Options Are Less Ideal:</h4>
            <ul>
              <li>A. RRSP: Contributing to an RRSP in a low tax bracket provides a smaller tax deduction. She might benefit more from deferring those RRSP contributions until her income is higher, so the tax deduction is more valuable.</li>
              <li>C. High-Interest Savings Account (HISA): While safe and relatively liquid, the interest earned is taxable in a non-registered account, and rates may be lower than potential investment returns in a TFSA.</li>
              <li>D. Non-Registered Brokerage Account: Investment growth would be taxable every year (for dividends, interest) or upon sale (capital gains), which is less efficient than the tax-free growth of a TFSA.</li>
            </ul>
            <button 
              className="start-button" 
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              Next Question
            </button>
          </div>
        );
      } else {
        return (
          <div className="feedback-message incorrect">
            <h3>Incorrect Answer</h3>
            <p>The correct answer is B. Contribute to her TFSA.</p>
            <p>Since Emily is in a lower tax bracket now and expects her income to increase in the future, using a TFSA makes more sense. She won't get a big immediate tax break from an RRSP at her current income level, and withdrawals from a TFSA are tax-free later.</p>
          </div>
        );
      }
    } else if (currentQuestion === 2) {
      if (selectedAnswer === 'A') {
        return (
          <div className="feedback-message correct">
            <div className="happy-dolphin-container">
              🐬
            </div>
            <h3>Correct Answer!</h3>
            <p>A TFSA is flexible; any gains you earn are tax-free, and withdrawals will not trigger taxation or affect future contribution room if you re-contribute in subsequent years. For a 3-year time horizon, a conservative investment or a high-interest TFSA can help James protect his savings while still earning some growth.</p>
            <h4>Why the Other Options Are Less Ideal:</h4>
            <ul>
              <li>B. RRSP + Home Buyers' Plan: While the HBP allows withdrawing up to $35,000 for a first home without immediate tax consequences, James must repay it over 15 years. If he doesn't, the withdrawn amount is added to his taxable income. Also, an RRSP is typically for longer-term retirement saving; it might be less flexible if timelines or plans change.</li>
              <li>C. Chequing Account: This offers no meaningful interest, so inflation erodes the value of the money over time.</li>
              <li>D. High-Risk Stocks: For a short 3-year goal, high volatility could mean James might face significant losses if the market dips at the wrong time.</li>
            </ul>
            <button 
              className="start-button" 
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              Next Question
            </button>
          </div>
        );
      } else {
        return (
          <div className="feedback-message incorrect">
            <h3>Incorrect Answer</h3>
            <p>The correct answer is A. Contribute to a TFSA and invest conservatively.</p>
            <p>A TFSA is flexible; any gains you earn are tax-free, and withdrawals will not trigger taxation or affect future contribution room if you re-contribute in subsequent years. For a 3-year time horizon, a conservative investment or a high-interest TFSA can help James protect his savings while still earning some growth.</p>
          </div>
        );
      }
    } else if (currentQuestion === 3) {
      if (selectedAnswer === 'A') {
        return (
          <div className="feedback-message correct">
            <div className="happy-dolphin-container">
              🐬
            </div>
            <h3>Correct Answer!</h3>
            <p>High-interest credit card debt is extremely costly. Paying it off first is almost always the best strategy because you effectively earn a "return" equal to the avoided 19% interest. After eliminating high-interest debt, Mia can direct future savings toward investments.</p>
            <h4>Why the Other Options Are Less Ideal:</h4>
            <ul>
              <li>B. TFSA while making minimum payments: The 19% interest on the card is far higher than typical TFSA investment returns, so Mia would be losing money by not paying down the card.</li>
              <li>C. Splitting the bonus: While it's better than not paying the card at all, carrying any high-interest debt still costs a lot. Paying it off completely first saves more money in the long run.</li>
              <li>D. GIC + minimum payments: A GIC might offer ~1–5% interest (depending on the market), which pales in comparison to 19% credit card interest costs.</li>
            </ul>
            <button 
              className="start-button" 
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              Next Question
            </button>
          </div>
        );
      } else {
        return (
          <div className="feedback-message incorrect">
            <h3>Incorrect Answer</h3>
            <p>The correct answer is A. Pay off the Credit Card Debt.</p>
            <p>High-interest credit card debt is extremely costly. Paying it off first is almost always the best strategy because you effectively earn a "return" equal to the avoided 19% interest. After eliminating high-interest debt, Mia can direct future savings toward investments.</p>
          </div>
        );
      }
    } else if (currentQuestion === 4) {
      if (selectedAnswer === 'A') {
        return (
          <div className="feedback-message correct">
            <div className="happy-dolphin-container">
              🐬
            </div>
            <h3>Correct Answer!</h3>
            <p>An emergency fund of 3–6 months of expenses provides a financial safety net if Daniel faces unexpected costs or job loss. A high-interest savings account ensures the funds remain accessible and preserve purchasing power better than a regular chequing account.</p>
            <h4>Why the Other Options Are Less Ideal:</h4>
            <ul>
              <li>B. Canadian Equity ETF: While investing for growth is important, going "all in" on equities before establishing an emergency fund is risky. A job loss or large expense could force him to sell at a bad time.</li>
              <li>C. Crypto Assets + TFSA: Crypto can be highly volatile and not suitable as a first move before having stable savings.</li>
              <li>D. Individual Stocks: Concentrated investments without a safety net can be too high-risk, especially if Daniel needs cash in an emergency.</li>
            </ul>
            <button 
              className="start-button" 
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              Next Question
            </button>
          </div>
        );
      } else {
        return (
          <div className="feedback-message incorrect">
            <h3>Incorrect Answer</h3>
            <p>The correct answer is A. Build an Emergency Fund in a High-Interest Savings Account.</p>
            <p>An emergency fund of 3–6 months of expenses provides a financial safety net if Daniel faces unexpected costs or job loss. A high-interest savings account ensures the funds remain accessible and preserve purchasing power better than a regular chequing account.</p>
          </div>
        );
      }
    } else if (currentQuestion === 5) {
      if (selectedAnswer === 'A') {
        return (
          <div className="feedback-message correct">
            <div className="happy-dolphin-container">
              🐬
            </div>
            <h3>Correct Answer!</h3>
            <p>An RESP allows contributions to grow tax-free and makes Aisha eligible for the Canada Education Savings Grant (CESG). The federal government matches 20% on the first $2,500 contributed each year (up to a certain limit), which is essentially free money toward her child's education.</p>
            <h4>Why the Other Options Are Less Ideal:</h4>
            <ul>
              <li>B. TFSA: While TFSAs are good for general savings, Aisha would miss out on the government grants provided specifically for education in an RESP.</li>
              <li>C. Unregistered Account: Gains are subject to annual taxes and there are no education-specific benefits, missing out on the CESG and tax-sheltered growth.</li>
              <li>D. Chequing Account: Provides minimal or no interest and no government incentives, meaning the savings won't grow nearly as effectively for education needs.</li>
            </ul>
            <button 
              className="start-button" 
              onClick={handleNextQuestion}
              style={{ marginTop: '20px' }}
            >
              Next Question
            </button>
          </div>
        );
      } else {
        return (
          <div className="feedback-message incorrect">
            <h3>Incorrect Answer</h3>
            <p>The correct answer is A. Open a Registered Education Savings Plan (RESP).</p>
            <p>An RESP allows contributions to grow tax-free and makes Aisha eligible for the Canada Education Savings Grant (CESG). The federal government matches 20% on the first $2,500 contributed each year (up to a certain limit), which is essentially free money toward her child's education.</p>
          </div>
        );
      }
    } else if (currentQuestion === 6) {
      if (selectedAnswer === 'A') {
        return (
          <div className="feedback-message correct">
            <div className="happy-dolphin-container">
              🐬
            </div>
            <h3>Correct Answer!</h3>
            <p>A balanced fund or ETF typically holds a mix of stocks and bonds, aligning with moderate risk tolerance. Holding this within a TFSA offers tax-free growth. Over 10+ years, this approach can provide a reasonable balance between growth and risk.</p>
            <h4>Why the Other Options Are Less Ideal:</h4>
            <ul>
              <li>B. 1-Year GIC renewed annually: GICs provide guaranteed returns but likely won't keep pace with long-term market returns, especially with inflation.</li>
              <li>C. High-Risk Cryptocurrency Portfolio: Volatile assets may exceed Noah's moderate risk tolerance, and large swings could jeopardize his long-term savings.</li>
              <li>D. Chequing Account: Earns little to no interest, meaning inflation would erode purchasing power over time.</li>
            </ul>
            <button 
              className="start-button" 
              onClick={resetQuiz}
              style={{ marginTop: '20px' }}
            >
              Restart Quiz
            </button>
          </div>
        );
      } else {
        return (
          <div className="feedback-message incorrect">
            <h3>Incorrect Answer</h3>
            <p>The correct answer is A. A Balanced Mutual Fund or ETF through a TFSA.</p>
            <p>A balanced fund or ETF typically holds a mix of stocks and bonds, aligning with moderate risk tolerance. Holding this within a TFSA offers tax-free growth. Over 10+ years, this approach can provide a reasonable balance between growth and risk.</p>
            <button 
              className="start-button" 
              onClick={resetQuiz}
              style={{ marginTop: '20px' }}
            >
              Restart Quiz
            </button>
          </div>
        );
      }
    }
  };

  const getCurrentQuestion = () => {
    if (currentQuestion === 1) {
      return (
        <p>Emily is 22 years old and just started her first job making $35,000 per year. She expects her income to increase significantly over the next few years as she gains experience. She has $200 per month to save and is trying to decide between different savings options. Which would be most beneficial for her current situation?</p>
      );
    } else if (currentQuestion === 2) {
      return (
        <p>James is 30 years old and wants to buy his first home in the next 3 years. He has $10,000 saved and plans to add more monthly. He is considering using an RRSP, a TFSA, or leaving the money in a chequing account. Which is the most suitable option for short-term home savings in Canada?</p>
      );
    } else if (currentQuestion === 3) {
      return (
        <p>Mia has $5,000 in credit card debt at a 19% annual interest rate. She recently received a $5,000 bonus from work. She wonders whether to invest it or pay off her credit card balance first.</p>
      );
    } else if (currentQuestion === 4) {
      return (
        <p>Daniel is 25 and has started a new job in Vancouver. He has no emergency savings and is renting an apartment. He has $2,000 he can allocate monthly after basic expenses. What should his first financial priority be?</p>
      );
    } else if (currentQuestion === 5) {
      return (
        <p>Aisha is 35 and has a 3-year-old child. She wants to start saving for her child's post-secondary education. She can contribute $2,500 per year. Which is the best vehicle to maximize government benefits and long-term growth for education?</p>
      );
    } else if (currentQuestion === 6) {
      return (
        <p>Noah is 30 and wants to start investing for mid- to long-term goals (10+ years). He has a moderate risk tolerance and can contribute $400 monthly. Which option is most suitable?</p>
      );
    }
  };

  const getOptions = () => {
    if (currentQuestion === 1) {
      return [
        { value: 'A', label: 'Contribute to her RRSP' },
        { value: 'B', label: 'Contribute to her TFSA' },
        { value: 'C', label: 'Put the money in a high-interest savings account' },
        { value: 'D', label: 'Open a non-registered brokerage account' }
      ];
    } else if (currentQuestion === 2) {
      return [
        { value: 'A', label: 'Contribute to a TFSA and invest conservatively' },
        { value: 'B', label: 'Contribute to an RRSP and plan to withdraw under the Home Buyers\' Plan (HBP)' },
        { value: 'C', label: 'Keep the money in a Chequing Account' },
        { value: 'D', label: 'Invest aggressively in High-Risk Stocks' }
      ];
    } else if (currentQuestion === 3) {
      return [
        { value: 'A', label: 'Pay off the Credit Card Debt' },
        { value: 'B', label: 'Invest in a TFSA and continue making minimum payments on the credit card' },
        { value: 'C', label: 'Split the bonus: Half to credit card, half to a High-Interest Savings Account' },
        { value: 'D', label: 'Invest in a Guaranteed Investment Certificate (GIC) and make minimum payments on the card' }
      ];
    } else if (currentQuestion === 4) {
      return [
        { value: 'A', label: 'Build an Emergency Fund in a High-Interest Savings Account' },
        { value: 'B', label: 'Invest all $2,000 in a Canadian Equity ETF for higher returns' },
        { value: 'C', label: 'Put half in Crypto Assets and half in a TFSA' },
        { value: 'D', label: 'Immediately buy Individual Stocks with the entire $2,000' }
      ];
    } else if (currentQuestion === 5) {
      return [
        { value: 'A', label: 'Open a Registered Education Savings Plan (RESP)' },
        { value: 'B', label: 'Deposit into a TFSA under her name for future education costs' },
        { value: 'C', label: 'Use an Unregistered Mutual Fund Account' },
        { value: 'D', label: 'Put the money into a Chequing Account for quick access' }
      ];
    } else if (currentQuestion === 6) {
      return [
        { value: 'A', label: 'A Balanced Mutual Fund or ETF through a TFSA' },
        { value: 'B', label: 'A 1-Year GIC renewed annually' },
        { value: 'C', label: 'A High-Risk Cryptocurrency Portfolio' },
        { value: 'D', label: 'Keeping funds in a Chequing Account for easy access' }
      ];
    }
    return [];
  };

  const getFirstAttemptCorrect = () => {
    let count = 0;
    for (let i = 1; i <= 5; i++) {
      if (attempts[i] === 1) count++;
    }
    return count;
  };

  const readMessage = () => {
    if (!isReading) {
      setIsReading(true);
      const message = `Heya! Fin the FinTech bot is here to help! Ready to make some waves with your financial know-how? You've come to the right place! I've got six splashtastic, real-life scenarios all about deciding whether to invest in an RRSP or TFSA, or how to handle high-interest credit card debt. Each question gives you multiple answers, but only one is the real catch of the day. Here's how it works, my fin-tastic friends: Read the Scenario: Picture yourself in the story—maybe you're saving for your first home or balancing whether to invest or pay off debt. Pick an Answer: You'll have a few options. Don't worry if you get stuck, it happens to the best dolphins! Check the Explanation: I'll let you know which choice makes the biggest splash and why the others might send you off-course. So, let's dive right in and test those financial flippers! I promise not to blow any bubbles here—just honest, helpful guidance to keep you swimming strong on your journey to financial well-being.`;
      
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onend = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }
  };

  useEffect(() => {
    // Play welcome message when component mounts
    const message = "Financial Literacy Quiz. Press m to hear the introductory message and press space to begin the quiz";
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);

    // Add spacebar handler
    const handleSpacePress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !quizStarted) {
        e.preventDefault(); // Prevent page scrolling
        handleStartClick();
      }
    };

    window.addEventListener('keydown', handleSpacePress);
    return () => window.removeEventListener('keydown', handleSpacePress);
  }, [quizStarted]); // Add quizStarted to dependencies

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'm') {
        readMessage();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [isReading]);

  return (
    <div>
      <Banner />
      <div className={`quiz-container ${quizStarted ? 'quiz-started' : ''}`}>
        <div className="quiz-content">
          {!quizStarted && (
            <div className="fin-message-container">
              <div className="fin-avatar-placeholder initial-fin-avatar">
                {/* Initial Fin avatar */}
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
                <p>Heya! Fin the FinTech bot is here to help! 🐬</p>
                <p>Ready to make some waves 🌊 with your financial know-how? You've come to the right place! I've got six splashtastic 🛟, real-life scenarios all about deciding whether to invest in an RRSP or TFSA, or how to handle high-interest credit card debt. Each question gives you multiple answers, but only one is the real catch of the day 🎣.</p>
                <p>Here's how it works, my fin-tastic friends:</p>
                <ul>
                  <li>Read the Scenario: Picture yourself in the story—maybe you're saving for your first home or balancing whether to invest or pay off debt.</li>
                  <li>Pick an Answer: You'll have a few options. Don't worry if you get stuck, it happens to the best dolphins!</li>
                  <li>Check the Explanation: I'll let you know which choice makes the biggest splash and why the others might send you off-course.</li>
                </ul>
                <p>So, let's dive right in and test those financial flippers 🥽! I promise not to blow any bubbles here 🫧—just honest, helpful guidance to keep you swimming strong on your journey to financial well-being.</p>
                
                <div className="start-button-container">
                  <button 
                    className="start-button"
                    onClick={handleStartClick}
                    disabled={isDolphinsSwimming}
                  >
                    Let's Start!
                  </button>
                  <div className="dolphins-container">
                    <span className={`dolphin ${isDolphinsSwimming ? 'swimming' : ''}`}>🐬</span>
                    <span className={`dolphin ${isDolphinsSwimming ? 'swimming' : ''}`}>🐬</span>
                    <span className={`dolphin ${isDolphinsSwimming ? 'swimming' : ''}`}>🐬</span>
                    <span className={`dolphin ${isDolphinsSwimming ? 'swimming' : ''}`}>🐬</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {quizStarted && (
            <div className="fin-message-container">
              <div className="fin-avatar-placeholder question-fin-avatar">
                {/* Question Fin avatar */}
              </div>
              <div className="quiz-question-bubble">
                {getCurrentQuestion()}
                <div className="quiz-options">
                  {getOptions().map((option) => (
                    <button
                      key={option.value}
                      className="quiz-option"
                      onClick={() => handleAnswerClick(option.value)}
                      style={{
                        backgroundColor: selectedAnswer === option.value ? '#e3f2fd' : undefined,
                        borderColor: selectedAnswer === option.value ? '#2196f3' : undefined,
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {getFeedbackMessage()}
              </div>
            </div>
          )}
        </div>
        <Chatbot />
      </div>

      {showResults && (
        <div className="quiz-results-overlay">
          <div className="quiz-results-popup">
            <button className="close-results" onClick={resetQuiz}>×</button>
            <h2>🐬 Quiz Results 🐬</h2>
            <div className="results-content">
              <p>Correct on First Attempt: {getFirstAttemptCorrect()} / 5</p>
              <h3>Attempts per Question:</h3>
              <ul>
                {Object.entries(attempts).map(([question, attemptCount]) => (
                  <li key={question}>
                    Question {question}: {attemptCount} attempt{attemptCount !== 1 ? 's' : ''}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialLiteracyQuiz; 