"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonDetail = void 0;
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../index"));
class PokemonDetail extends sequelize_1.Model {
}
exports.PokemonDetail = PokemonDetail;
PokemonDetail.init({
    name: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    data: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    updated_at: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: index_1.default,
    tableName: "PokemonDetail",
    timestamps: false,
});
