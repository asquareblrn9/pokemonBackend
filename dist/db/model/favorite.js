"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favorite = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class Favorite extends sequelize_1.Model {
}
exports.Favorite = Favorite;
Favorite.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
}, {
    sequelize: index_1.default,
    tableName: "Favorites",
    timestamps: false,
});
