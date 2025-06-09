enum Type {
    UNKNOW,
    PAR_OPEN, // (
    PAR_CLOSE, // )
    SEMICOLON, // ;
    EQUAL, // =
    RESERVERD_WORD,
    NUMBER, // number
    STRING, // string
    COLON, // :
    BRACK_OPEN, // [
    BRACK_CLOSE, // ]
    BRACE_OPEN, // {
    BRACE_CLOSE, // }
    QUOTE, // "
    ASSIGN
}

class Token {

    // private row: number;
    // private column: number;
    // private lexeme: string;
    // private typeToken: Type;
    public row: number;
    public column: number;
    public lexeme: string;
    public typeToken: Type;

    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToken;
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }

    getLexeme(): string {
        return this.lexeme;
    }

    getType(): Type {
        return this.typeToken;
    }

    getRow(): number {
        return this.row;
    }

    getColumn(): number {
        return this.column;
    }
}


export { Token, Type }