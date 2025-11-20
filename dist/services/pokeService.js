"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFirst150Pokemon = fetchFirst150Pokemon;
exports.fetchPokemonDetail = fetchPokemonDetail;
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
const pokemonList_1 = require("../db/model/pokemonList");
const pokemonDetail_1 = require("../db/model/pokemonDetail");
const BASE_URL = process.env.POKEMON_URL || "https://pokeapi.co/api/v2";
const httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
const ONE_DAY = 24 * 60 * 60 * 1000;
async function safeGet(url) {
    try {
        return await axios_1.default.get(url, { httpsAgent });
    }
    catch {
        return null;
    }
}
async function fetchFirst150Pokemon() {
    const cache = await pokemonList_1.PokemonList.findByPk(1);
    if (cache && Date.now() - cache.updated_at < ONE_DAY) {
        return JSON.parse(cache.data);
    }
    const res = await safeGet(`${BASE_URL}/pokemon?limit=150`);
    if (!res)
        return cache ? JSON.parse(cache.data) : [];
    const results = res.data.results;
    const detailed = [];
    for (const item of results) {
        const detail = await safeGet(item.url);
        if (!detail)
            continue;
        const d = detail.data;
        detailed.push({
            id: d.id,
            name: d.name,
            image: d.sprites.other["official-artwork"].front_default,
            types: d.types.map((t) => t.type.name),
        });
    }
    await pokemonList_1.PokemonList.upsert({
        id: 1,
        data: JSON.stringify(detailed),
        updated_at: Date.now(),
    });
    return detailed;
}
async function fetchPokemonDetail(name) {
    var _a, _b;
    const pRes = await safeGet(`${BASE_URL}/pokemon/${name}`);
    if (!pRes) {
        throw new Error(`Failed to fetch data for Pokémon: ${name}`);
    }
    const data = pRes.data;
    const image = ((_b = (_a = data.sprites.other) === null || _a === void 0 ? void 0 : _a["official-artwork"]) === null || _b === void 0 ? void 0 : _b.front_default) ||
        data.sprites.front_default ||
        "";
    const types = data.types.map((t) => t.type.name);
    const abilities = data.abilities.map((a) => a.ability.name);
    const sRes = await safeGet(data.species.url);
    if (!sRes) {
        throw new Error(`Failed to fetch species data for ${name}`);
    }
    const chainRes = await safeGet(sRes.data.evolution_chain.url);
    if (!chainRes) {
        throw new Error(`Failed to fetch evolution chain for ${name}`);
    }
    const chain = chainRes.data.chain;
    const evolutions = [];
    const traverse = (node) => {
        var _a;
        if (!evolutions.includes(node.species.name)) {
            evolutions.push(node.species.name);
        }
        (_a = node.evolves_to) === null || _a === void 0 ? void 0 : _a.forEach((child) => traverse(child));
    };
    traverse(chain);
    const result = {
        id: data.id,
        name: data.name,
        image,
        types,
        abilities,
        evolutions,
    };
    await pokemonDetail_1.PokemonDetail.upsert({
        name,
        data: JSON.stringify(result),
        updated_at: Date.now(),
    });
    return result;
}
