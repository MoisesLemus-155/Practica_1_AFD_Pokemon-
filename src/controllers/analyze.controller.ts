import { Request, Response } from 'express';
import {LexicalAnalyzer} from '../Analyzer/LexicalAnalyzer';

export const analyze = async (req: Request, res: Response) => {
    const input = req.body;

    let lexicalAnalyzer: LexicalAnalyzer = new LexicalAnalyzer();

    let tokenList = lexicalAnalyzer.scanner(input);
    let errorList = lexicalAnalyzer.getErrorList();

    res.json({
        "tokens": tokenList,
        "errors": errorList,
    })
}

export const ping = (req: Request, res: Response) => {
    res.send("pong");
}

export const justGet = (req: Request, res: Response) => {
    res.send("Hola Mundo, Bienvenido a la guia Pokemon")
}