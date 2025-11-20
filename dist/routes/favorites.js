"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const favoritesService_1 = require("../services/favoritesService");
const router = (0, express_1.Router)();
// GET /api/favorites
router.get("/", async (_req, res) => {
    const favorites = await (0, favoritesService_1.getFavorites)();
    res.json(favorites);
});
// POST /api/favorites/:name
router.post("/:name", async (req, res) => {
    const favorites = await (0, favoritesService_1.addFavorite)(req.params.name);
    res.json(favorites);
});
// DELETE /api/favorites/:name
router.delete("/:name", async (req, res) => {
    const favorites = await (0, favoritesService_1.removeFavorite)(req.params.name);
    res.json(favorites);
});
exports.default = router;
