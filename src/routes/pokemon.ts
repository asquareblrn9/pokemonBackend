import { Router, Request, Response, NextFunction } from "express";
import {
  fetchFirst150Pokemon,
  fetchPokemonDetail,
} from "../services/pokeService";

const router = Router();

// GET /api/pokemon – first 150
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await fetchFirst150Pokemon();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/pokemon/:name – detail + evolutions
router.get(
  "/:name",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const detail = await fetchPokemonDetail(req.params.name);
      res.json(detail);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
