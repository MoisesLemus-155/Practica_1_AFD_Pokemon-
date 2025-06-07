import express from 'express';
import analyzeRouter from './routes/analyze.route';

const app = express()
const PORT = 3000;

app.use(express.text());
app.use(analyzeRouter)

app.listen(PORT, () => {
    console.log(`Server is running at Port: ${PORT}`);
})