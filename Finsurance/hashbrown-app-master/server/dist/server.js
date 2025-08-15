"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.ts (TypeScript version)
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// POST endpoint with proper types
app.post('/api/data', (req, res) => {
    console.log('Received data:', req.body);
    res.json({ message: 'Data received successfully' });
});
// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
