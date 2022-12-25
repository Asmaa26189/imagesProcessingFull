"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// to acess access this /api to check levels of end points
var express_1 = __importDefault(require("express"));
// define router
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('Routes Start');
});
// Export router to use it in any import
exports.default = routes;
