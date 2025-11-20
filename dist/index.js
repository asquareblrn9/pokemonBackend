"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pokemon_1 = __importDefault(require("./routes/pokemon"));
const favorites_1 = __importDefault(require("./routes/favorites"));
const index_1 = __importDefault(require("./db/index"));
require("./db/model/pokemonList");
require("./db/model/pokemonDetail");
require("./db/model/favorite"); //
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)({
    origin: "*", // Allow React frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
}));
app.use(express_1.default.json());
app.use("/api/pokemon", pokemon_1.default);
app.use("/api/favorites", favorites_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to the Pokemon API");
});
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", message: "Pokemon API is running" });
});
app.use((err, req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
index_1.default.sync().then(() => {
    console.log("Database synced successfully.");
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
