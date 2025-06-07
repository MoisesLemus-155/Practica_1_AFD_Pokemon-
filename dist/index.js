"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import analyzeRouter from './routes/analyze.js';
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.text());
// app.use(analyzeRouter)
app.listen(port, () => {
    console.log(`Server is running at Port: ${port}`);
});
