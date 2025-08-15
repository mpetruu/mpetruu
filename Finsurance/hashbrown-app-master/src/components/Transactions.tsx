import React from "react";
import "./Transactions.css";
import { COLORS_INCOME, COLORS_EXPENSE } from "./DoughnutCharts"; // Import the colors
import { useSession } from "./SessionProvider";

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  date: string;
  description: string;
  recurring?:string;
}

interface TransactionsProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}




const Transactions: React.FC<TransactionsProps> = ({ transactions, onDelete }) => {
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');

  console.log("Expense Transactions:", expenseTransactions);

  // Create a map of categories to colors, separately for income and expense
  const categoryColorMap: { [key: string]: string } = {};
  let incomeColorIndex = 0;
  let expenseColorIndex = 0;

  transactions.forEach(transaction => {
    if (!categoryColorMap[transaction.category]) {
      if (transaction.type === "income") {
        categoryColorMap[transaction.category] = COLORS_INCOME[incomeColorIndex % COLORS_INCOME.length];
        incomeColorIndex++;
      } else {
        categoryColorMap[transaction.category] = COLORS_EXPENSE[expenseColorIndex % COLORS_EXPENSE.length];
        expenseColorIndex++;
      }
    }
  });

  const API_URL = process.env.REACT_APP_API_URL || ""; // Load from .env

  const { user } = useSession();
  const handleDelete = async (id: string) => {
    try {
      console.log("Deleting transaction at:", `${API_URL}transactions/delete_transaction/${id}`);
      const response = await fetch(`${API_URL}transactions/delete_transaction/${id}`, {
        method: "DELETE"
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
  
      console.log(`Transaction ${id} deleted successfully`);
  
      // Call onDelete to remove the transaction from the state
      onDelete(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };
  

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD'
    }).format(amount);
  };

  return (
    <div className="transactions-container">
      <div className="income">
        <div className="transaction-header">
          <h2>Income</h2>
          <span>💰</span>
        </div>
        <div className="transaction-list">
          {incomeTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="transaction-item"
              style={{ borderLeft: `4px solid ${categoryColorMap[transaction.category]}` }}
            >
              <div className="transaction-details">
                <span className="transaction-name">{transaction.description}</span>
              </div>
              <div className="transaction-right">
                <span className="transaction-amount">
                  {formatAmount(transaction.amount)}
                </span>
                <button 
                  className="delete-button"
                  onClick={() => onDelete(transaction.id)}
                  aria-label="Delete transaction"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="expenses">
        <div className="transaction-header">
          <h2>Expenses</h2>
          <span>💸</span>
        </div>
        <div className="transaction-list">
          {expenseTransactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="transaction-item"
              style={{ borderLeft: `4px solid ${categoryColorMap[transaction.category]}` }}
            >
              <div className="transaction-details">
                <span className="transaction-name">{transaction.description}</span>
              </div>
              <div className="transaction-right">
                <span className="transaction-amount">
                  {formatAmount(transaction.amount)}
                </span>
                <button 
                  className="delete-button"
                  onClick={() => handleDelete(transaction.id)}
                  aria-label="Delete transaction"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
