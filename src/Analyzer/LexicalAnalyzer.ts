import { Token, Type } from './Token';

class LexicalAnalyzer {

    private row: number;
    private column: number;
    private auxChar: string;
    private state: number;
    private tokenList: Token[];
    private errorList: Token[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
    }

    scanner(input: string) {
        let char: string;
        for (let i: number = 0; i < input.length; i++) {
            char = input[i];

            switch (this.state) {
                case 0:
                    switch (char) {
                        case '(':
                            this.state = 1;
                            this.addCharacter(char);
                            break;

                        case ')':
                            this.state = 2;
                            this.addCharacter(char);
                            break;

                        case '=':
                            this.state = 3;
                            this.addCharacter(char);
                            break;

                        case ';':
                            this.state = 4;
                            this.addCharacter(char);
                            break;

                        case ':':
                            this.state = 5;
                            this.addCharacter(char);
                            break;

                        case '{':
                            this.state = 6;
                            this.addCharacter(char);
                            break;

                        case '}':
                            this.state = 7;
                            this.addCharacter(char);
                            break;

                        case '[':
                            this.state = 55;
                            this.addCharacter(char);
                            break;

                        case ']':
                            this.state = 54;
                            this.addCharacter(char);
                            break;

                        case '"':
                            this.state = 56;
                            this.addCharacter(char);
                            break;

                        case ' ':
                            this.column++;
                            break;

                        case 'J':
                            this.state = 8;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case 's':
                            this.state = 15;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case 'a':
                            this.state = 20;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case 'd':
                            this.state = 29;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case 'p':
                            this.state = 41;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case 'f':
                            this.state = 58;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case 'n':
                            this.state = 63;
                            this.column++;
                            this.addCharacter(char);
                            break;

                        case '\n':
                            this.row++;
                            this.column = 1;
                            break;
                        case '\r':
                            if (input[i + 1] === '\n') {
                                i++;
                            }
                            this.row++;
                            this.column = 1;
                            break;
                        case '\t':
                            this.column += 4;
                            break;
                        default:
                            if (/\d/.test(char)) {
                                this.state = 70;
                                this.addCharacter(char);
                            } else if (char == '#' && i == input.length - 1) {
                                console.log("Analyze Finished");
                            } else {
                                this.addError(Type.UNKNOW, char, this.row, this.column);
                                this.column++;
                            }
                            break;
                    }
                    break;
                case 1: // (
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 2: // )
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 3: // =
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 4: // ;
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 5: // :
                    if (char == '=') {
                        this.state = 69;
                        this.addCharacter(char);
                        continue;
                    }
                    this.addToken(Type.COLON, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 6: // {
                    this.addToken(Type.BRACE_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 7: // }
                    this.addToken(Type.BRACE_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 8: // J
                    if (char != 'u') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 9;
                    break;
                case 9:
                    if (char != 'g') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 10;
                    break;
                case 10:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 11;
                    break;
                case 11:
                    if (char != 'd') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 12;
                    break;
                case 12:
                    if (char != 'o') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 13;
                    break;
                case 13:
                    if (char != 'r') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 14;
                    break;
                case 14:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 15:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 16;
                    break;
                case 16:
                    if (char != 'l') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 17;
                    break;
                case 17:
                    if (char != 'u') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 18;
                    break;
                case 18:
                    if (char != 'd') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 19;
                    break;
                case 19:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 20:
                    if (char === 't') {
                        this.addCharacter(char);
                        this.state = 21;
                    } else if (char === 'g') {
                        this.state = 26
                        this.addCharacter(char);
                    } else {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 21:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 22;
                    break;
                case 22:
                    if (char != 'q') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 23;
                    break;
                case 23:
                    if (char != 'u') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 24;
                    break;
                case 24:
                    if (char != 'e') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 25;
                    break;
                case 25:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 26:
                    if (char != 'u') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 27;
                    break;
                case 27:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 28;
                    break;
                case 28:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 29:
                    if (char === 'e') {
                        this.addCharacter(char);
                        this.state = 30;
                    } else if (char === 'r') {
                        this.addCharacter(char);
                        this.state = 36;
                    } else {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 30:
                    if (char != 'f') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 31;
                    break;
                case 31:
                    if (char != 'e') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 32;
                    break;
                case 32:
                    if (char != 'n') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 33;
                    break;
                case 33:
                    if (char != 's') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 34;
                    break;
                case 34:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 35;
                    break;
                case 35:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 36:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 37;
                    break;
                case 37:
                    if (char != 'g') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 38;
                    break;
                case 38:
                    if (char != 'o') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 39;
                    break;
                case 39:
                    if (char != 'n') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 40;
                    break;
                case 40:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 41:
                    if (char === 'l') {
                        this.addCharacter(char);
                        this.state = 42;
                    } else if (char === 's') {
                        this.addCharacter(char);
                        this.state = 47;
                    } else {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;
                case 42:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 43;
                    break;
                case 43:
                    if (char != 'n') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 44;
                    break;
                case 44:
                    if (char != 't') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 45;
                    break;
                case 45:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 46;
                    break;
                case 46:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 47:
                    if (char != 'i') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 48;
                    break;
                case 48:
                    if (char != 'q') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 49;
                    break;
                case 49:
                    if (char != 'u') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 50;
                    break;
                case 50:
                    if (char != 'i') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 51;
                    break;
                case 51:
                    if (char != 'c') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 52;
                    break;
                case 52:
                    if (char != 'o') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 53;
                    break;
                case 53:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 54: // [
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 55: // ]
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 56:                  
                    if (char === '"') {
                        this.addCharacter(char);
                        this.state = 57;
                    } else if (char === '#' || char === '\n') {
                        this.addError(Type.UNKNOW, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    } else {
                        this.addCharacter(char);
                    }
                    break;
                case 57:
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 58:
                    if (char != 'u') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 59;
                    break;
                case 59:
                    if (char != 'e') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 60;
                    break;
                case 60:
                    if (char != 'g') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 61;
                    break;
                case 61:
                    if (char != 'o') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 62;
                    break;
                case 62:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 63:
                    if (char != 'o') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 64;
                    break;
                case 64:
                    if (char != 'r') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 65;
                    break;
                case 65:
                    if (char != 'm') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 66;
                    break;
                case 66:
                    if (char != 'a') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 67;
                    break;
                case 67:
                    if (char != 'l') {
                        this.addError(Type.UNKNOW, this.auxChar + char, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                        continue;
                    }
                    this.addCharacter(char);
                    this.state = 68;
                    break;
                case 68:
                    this.addToken(Type.RESERVERD_WORD, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 69:
                    this.addToken(Type.ASSIGN, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                case 70:
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                        continue;
                    }
                    this.addToken(Type.NUMBER, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;
                default:
                    break;
            }
        }
        return this.tokenList;
    }


    private addCharacter(char: string) {
        this.auxChar += char;
        this.column++;
    }

    private clean() {
        this.state = 0;
        this.auxChar = '';
    }

    private addToken(type: Type, lexeme: string, row: number, column: number) {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    private addError(type: Type, lexeme: string, row: number, column: number) {
        this.errorList.push(new Token(type, lexeme, row, column));
    }

    getErrorList() {
        return this.errorList;
    }
}

export { LexicalAnalyzer };

