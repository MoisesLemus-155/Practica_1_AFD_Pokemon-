import {Router} from 'express';
import {analyze, justGet} from '../controllers/analyze.controller';

const analyzeRouter = Router();

analyzeRouter.get('/', justGet)
analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;