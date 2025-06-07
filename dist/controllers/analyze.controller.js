"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ping = exports.analyze = void 0;
// import { LexicalAnalyzer} from '../Analyzer/LexicalAnalyzer';
const analyze = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const input = req.body;
    res.json({
        "tokens": "Aca van los tokens",
        "errors": "Aca van los errores",
    });
});
exports.analyze = analyze;
const ping = (req, res) => {
    res.send("pong");
};
exports.ping = ping;
