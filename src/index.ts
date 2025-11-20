import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import pokemonRoutes from "./routes/pokemon";
import favoritesRoutes from "./routes/favorites";
import sequelize from "./db/index";
import "./db/model/pokemonList";
import "./db/model/pokemonDetail";
import "./db/model/favorite"; //

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "*", // Allow React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);

app.use(express.json());

app.use("/api/pokemon", pokemonRoutes);
app.use("/api/favorites", favoritesRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Pokemon API");
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Pokemon API is running" });
});

app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

sequelize.sync().then(() => {
  console.log("Database synced successfully.");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
