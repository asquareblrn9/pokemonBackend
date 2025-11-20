"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFavorites = getFavorites;
exports.addFavorite = addFavorite;
exports.removeFavorite = removeFavorite;
const favorite_1 = require("../db/model/favorite");
async function getFavorites() {
    const favorites = await favorite_1.Favorite.findAll({ attributes: ["name"] });
    return favorites.map((f) => f.name);
}
async function addFavorite(name) {
    const normalized = name.toLowerCase();
    await favorite_1.Favorite.findOrCreate({ where: { name: normalized } });
    return getFavorites();
}
async function removeFavorite(name) {
    const normalized = name.toLowerCase();
    await favorite_1.Favorite.destroy({ where: { name: normalized } });
    return getFavorites();
}
