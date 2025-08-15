import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs'; // To interact with the file system
import path from 'path';

const app = express();
const port = 5000;

const budgetFilePath = path.join(__dirname, 'budget.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());


const readBudgetFile = (): any => {
    try {
      if (!fs.existsSync(budgetFilePath)) {
        return [];
      }
      const fileData = fs.readFileSync(budgetFilePath, 'utf-8');
      console.log(fileData);
      return JSON.parse(fileData);
    } catch (error) {
      console.error('Error reading budget file:', error);
      return [];
    }
  };
  
  const writeBudgetFile = (data: any): void => {
    try {
      fs.writeFileSync(budgetFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing to budget file:', error);
    }
  };
  

// POST endpoint with proper types
app.post('http://localhost:5000/api/data', (req: Request, res: Response) => {
    console.log('POST request received');
    const { name, type, category, amount } = req.body;
    console.log('Received data hi:', req.body);  // This should print the data
  
    const budgetData = readBudgetFile();
    console.log('After reading budget file');
  
    // Continue with the rest of the code...
  });
  

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
