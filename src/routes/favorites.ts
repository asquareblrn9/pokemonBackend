import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../services/favoritesService";

const router = Router();

// GET /api/favorites
router.get("/", async (_req, res) => {
  const favorites = await getFavorites();
  res.json(favorites);
});

// POST /api/favorites/:name
router.post("/:name", async (req, res) => {
  const favorites = await addFavorite(req.params.name);
  res.json(favorites);
});

// DELETE /api/favorites/:name
router.delete("/:name", async (req, res) => {
  const favorites = await removeFavorite(req.params.name);
  res.json(favorites);
});

export default router;
