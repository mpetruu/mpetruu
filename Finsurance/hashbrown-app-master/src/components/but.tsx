import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession } from './SessionProvider';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
  recurring:string;
}

interface ButtonProps {
  onAddTransaction: (transaction: Transaction) => void;
}

const RequestButton: React.FC<ButtonProps> = ({ onAddTransaction }) => {
    const [response, setResponse] = useState<string | null>(null);
    const [inputValue, setInputValue] = useState<string>('');
    const [type, setType] = useState<string>('expense');
    const [category, setCategory] = useState<string>('personal');
    const [amount, setAmount] = useState<number | string>('');
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.body.classList.contains('dark-mode'));

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.body.classList.contains('dark-mode'));
                }
            });
        });

        observer.observe(document.body, {
            attributes: true
        });

        return () => observer.disconnect();
    }, []);

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: '20px 0',
        backgroundColor: isDarkMode ? '#2d3748' : 'white',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px',
    };

    const buttonStyle: React.CSSProperties = {
        fontSize: '24px',
        padding: '8px 16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginBottom: formVisible ? '15px' : '0',
        transition: 'all 0.2s ease',
    };

    const formStyle: React.CSSProperties = {
        display: 'flex',
        gap: '10px',
        width: '100%',
        maxWidth: '800px',
        padding: '15px',
        backgroundColor: isDarkMode ? '#1a202c' : '#f8f9fa',
        borderRadius: '8px',
    };

    const inputStyle: React.CSSProperties = {
        padding: '8px 12px',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        flex: 1,
    };

    const API_URL = process.env.REACT_APP_API_URL || ""; // Load from .env
    const { user } = useSession();
    const sendTransactionToAPI = async (transaction: Transaction): Promise<Transaction | null> => {
        try {
            const current_transaction = {
                user_id: user.id,      // Ensure this is a valid user ID
                date: transaction.date,
                amount: transaction.amount,
                category_id: transaction.category,  // Ensure the API expects 'category_id'
                source: transaction.description,
                recurring: transaction.recurring   // Ensure API supports this format
            };
            console.log(current_transaction);
            console.log("Sending JSON to API:", JSON.stringify(current_transaction, null, 2));
            // Send transaction data to API
            const response = await axios.post(`${API_URL}transactions/add_transaction`, current_transaction, {
                headers: { "Content-Type": "application/json" } // Ensures proper JSON format
            });
    
            if (response.status === 201 || response.status === 200) {
                return { ...transaction, id: response.data.id }; // Return API's actual transaction ID
            } else {
                throw new Error('Failed to add transaction');
            }
        } catch (error) {
            console.error('API Error:', error);
            return null;
        }
    };
    

    const handleButtonClick = async () => {
        if (!inputValue.trim() || !category || amount === '' || Number(amount) <= 0) {
            setError('All fields must be filled, and the amount must be greater than 0.');
            return;
        }
    
        setError(null); // Clear previous errors
    
        const newTransaction: Transaction = {
            id: Date.now().toString(), 
            type: type as 'income' | 'expense',
            amount: Number(amount),
            category: category,
            date: new Date().toISOString(),
            description: inputValue,
            recurring: "weekly"
        };
    
        try {
            const addedTransaction = await sendTransactionToAPI(newTransaction);
            if (addedTransaction) {
                onAddTransaction(addedTransaction); // Update UI only after API success
                resetForm();
                setFormVisible(false);
            }
        } catch (error) {
            console.error('Error adding transaction:', error);
            setError('Failed to add transaction. Please try again.');
        }
    };

    const sending = async (value: string, type: string, category: string, amount: number | string) => {
        try {
            const res = await axios.post('http://localhost:5000/api/data', { 
                name: value, 
                type: type, 
                category: category, 
                amount: amount 
            });
            setResponse(JSON.stringify(res.data));
        } catch (error) {
            console.error('Error making request:', error);
        }
    };

    const resetForm = () => {
        setInputValue('');
        setType('expense');
        setCategory('personal');
        setAmount('');
        setError(null);
    };

    return (
        <div style={containerStyle}>
            <button onClick={() => setFormVisible(!formVisible)} style={buttonStyle}>
                {formVisible ? '−' : '+'}
            </button>

            {formVisible && (
                <div style={formStyle}>
                    <input
                        style={inputStyle}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Description"
                    />
                    <select
                        style={inputStyle}
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                    <select
                        style={inputStyle}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="essentials">Essentials</option>
                        <option value="discretionary">Discretionary</option>
                        <option value="debt_payment">Debt Payment</option>
                        <option value="investment">Investment</option>
                        <option value="miscallaneous">Miscallaneous</option>
                        <option value="saving">Saving</option>
                        <option value="income">Income</option>
                    </select>
                    <input
                        style={inputStyle}
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Monthly amount"
                    />
                    <button 
                        onClick={handleButtonClick}
                        style={{
                            ...buttonStyle,
                            marginBottom: 0,
                            fontSize: '16px',
                            padding: '8px 16px',
                        }}
                    >
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

export default RequestButton;
