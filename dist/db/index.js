"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(process.cwd(), "db", "cache.db");
exports.sequelize = new sequelize_1.Sequelize({
    dialect: "sqlite",
    storage: dbPath,
    logging: false,
});
exports.default = exports.sequelize;
