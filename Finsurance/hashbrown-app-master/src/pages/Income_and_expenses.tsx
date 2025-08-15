import React, { useEffect, useState } from 'react';
import Banner from "../components/Banner";
import Chatbot from "../components/Chatbot";
import Button from "../components/but";
import { DoughnutCharts } from "../components/DoughnutCharts";
import Transactions from "../components/Transactions";
import "./Income_and_expenses.css"
import { useSession } from '../components/SessionProvider';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
}

const Income_and_expenses: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isReading, setIsReading] = useState(false);
    const { user } = useSession();

    useEffect(() => {
        const API_URL = process.env.REACT_APP_API_URL || ""; // Load from .env
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`${API_URL}transactions/get_transactions_by_user/${user.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }
                const data = await response.json();
                console.log(data);
                
                // Ensure data is an array before setting state
                if (!Array.isArray(data)) {
                    throw new Error("Invalid data format: Expected an array");
                }
        
                console.log("Fetched transactions:", data);
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setTransactions([]); // Fallback to an empty array
            }
        };fetchTransactions();        
    }, []);
     // Runs only once when component mounts

    const addTransaction = (newTransaction: Transaction) => {
        // Keep the original category instead of overwriting it with description
        const formattedTransaction = {
            ...newTransaction
        };
        setTransactions(prev => [...prev, formattedTransaction]);
    };

    
    const deleteTransaction = (id: string): void => {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id));
    };    


    const readMessage = () => {
        if (isReading) {
            window.speechSynthesis.cancel();
            setIsReading(false);
            return;
        }

        setIsReading(true);
        const message = `Hey there! Ready to make a splash with your finances? 🌊

        Make sure to enter you financial goals in the budget text-box bellow. Then, use the add button below to record your sources of income and expenses. Just click the plus button and fill in the details - it's as easy as riding a wave! 

        Remember to categorize each transaction properly so we can track where your money is swimming to. Once all entries are filled, click the copy-paste buttton besides the budget text-box, and paste the genrated prompt in my chat bubble. Remember, I'm just a click away! 🐬`;

        const utterance = new SpeechSynthesisUtterance(message);
        utterance.onend = () => setIsReading(false);
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    };

    const copyToClipboard = () => {
        const textarea = document.querySelector('.context-textarea') as HTMLTextAreaElement;
        const contextText = textarea?.value || '';
        const transactionsText = JSON.stringify(transactions, null, 2);
        const textToCopy = `Context:\n${contextText}\n\nTransactions:\n${transactionsText}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            const copyButton = document.querySelector('.copy-button');
            if (copyButton) {
                copyButton.textContent = '✓ Copied!';
                setTimeout(() => {
                    copyButton.textContent = '📋 Copy Context & Transactions';
                }, 2000);
            }
        });
    };

    useEffect(() => {
        // Create and play the audio message when component mounts
        const message = "Income and Expenses WebPage";
        const utterance = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterance);
    }, []);

    return (
        <>
            <Banner />
            <div className="main-layout">
                <div className="fin-message-container">
                    <div className="fin-avatar-placeholder">
                        {/* Fin avatar */}
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
                        <p>Hey there! Ready to make a splash with your finances? 🌊</p>
                        <p>Make sure to enter you financial goals in the budget text-box bellow.</p>
                        <p>Then, use the add button below to record your sources of income and expenses. Just click the plus button and fill in the details - it's as easy as riding a wave!</p>
                        <p>Remember to categorize each transaction properly so we can track where your money is swimming to.</p> 
                        <p> Once all entries are filled, click the copy-paste buttton besides the budget text-box, and paste the genrated prompt in my chat bubble. Remember, I'm just a click away! 🐬</p>
                    </div>
                </div>
                <div className="context-input-container">
                    <label htmlFor="context-textarea">Enter your budgeting context:</label>
                    <textarea
                        id="context-textarea"
                        className="context-textarea"
                        placeholder="Example: Trying to save $2000 for family vacation"
                        aria-label="Budgeting context input"
                    />
                    <button 
                        className="copy-button"
                        onClick={copyToClipboard}
                        aria-label="Copy context and transactions"
                    >
                        📋 Copy Context & Transactions
                    </button>
                </div>
                <div className="add-bar-indicator">
                    <span className="indicator-arrow">⬇️</span>
                    <span className="indicator-text">Add your income and expenses here</span>
                    <span className="indicator-arrow">⬇️</span>
                </div>
                <div className="main-content">
                    <Button onAddTransaction={addTransaction} />
                    <div className="charts-container">
                        <DoughnutCharts transactions={transactions} />
                    </div>
                    <Transactions 
                        transactions={transactions} 
                        onDelete={deleteTransaction} 
                    />
                </div>
            </div>
            <Chatbot />
        </>
    );
};

export default Income_and_expenses;
