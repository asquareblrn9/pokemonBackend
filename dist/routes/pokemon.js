"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokeService_1 = require("../services/pokeService");
const router = (0, express_1.Router)();
// GET /api/pokemon – first 150
router.get("/", async (req, res, next) => {
    try {
        const data = await (0, pokeService_1.fetchFirst150Pokemon)();
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
// GET /api/pokemon/:name – detail + evolutions
router.get("/:name", async (req, res, next) => {
    try {
        const detail = await (0, pokeService_1.fetchPokemonDetail)(req.params.name);
        res.json(detail);
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
