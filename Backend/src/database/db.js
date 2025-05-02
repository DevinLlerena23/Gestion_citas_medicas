"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.db = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const path_1 = __importDefault(require("path"));
exports.db = new better_sqlite3_1.default(path_1.default.resolve(__dirname, '../../appointments.db'));
const connectDB = () => {
    exports.db.prepare(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientName TEXT NOT NULL,
    doctorName TEXT NOT NULL,
    appointmentDate TEXT NOT NULL,
    reason TEXT NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL
  )`).run();
};
exports.connectDB = connectDB;
