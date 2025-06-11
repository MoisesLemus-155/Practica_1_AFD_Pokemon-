import { Request, Response } from 'express';
import { LexicalAnalyzer } from '../Analyzer/LexicalAnalyzer';
import { processTokens } from '../Analyzer/processTokens';


export const analyze = async (req: Request, res: Response) => {
    const input = req.body.input;

    const lexicalAnalyzer = new LexicalAnalyzer();
    const tokenList = lexicalAnalyzer.scanner(input);
    const errorList = lexicalAnalyzer.getErrorList();
    const jugadores = processTokens(tokenList);

    res.json({
        tokens: tokenList,
        errors: errorList,
        jugadores: jugadores,
    });
};

export const justGet = (req: Request, res: Response) => {
    res.send("Hola Mundo, Bienvenido a la PokeAyuda")
}