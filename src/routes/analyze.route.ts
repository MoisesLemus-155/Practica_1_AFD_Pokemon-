import {Router} from 'express';
import {analyze, justGet, ping} from '../controllers/analyze.controller';

const analyzeRouter = Router();

analyzeRouter.get('/', justGet)
analyzeRouter.get('/ping', ping)
analyzeRouter.post('/analyze', analyze);

export default analyzeRouter;