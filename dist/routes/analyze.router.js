"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const analyze_controller_js_1 = require("../controllers/analyze.controller.js");
const analyzeRouter = (0, express_1.Router)();
analyzeRouter.get('/ping', analyze_controller_js_1.ping);
analyzeRouter.post('/analyze', analyze_controller_js_1.analyze);
exports.default = analyzeRouter;
