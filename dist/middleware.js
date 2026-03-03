"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(401).json({ message: "Authorization header missing" });
        }
        const token = header.split(" ")[1]; // Bearer TOKEN
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        if (decoded) {
            req.userId = decoded.userId;
            next();
        }
        else {
            return res.status(403).json({ message: "Invalid token" });
        }
    }
    catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.userMiddleware = userMiddleware;
