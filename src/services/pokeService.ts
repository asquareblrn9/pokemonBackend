import axios from "axios";
import https from "https";
import { PokemonList } from "../db/model/pokemonList";
import { PokemonDetail } from "../db/model/pokemonDetail";
import { PokemonSummary, PokemonDetail as DetailType } from "../types/pokemon";

const BASE_URL = process.env.POKEMON_URL || "https://pokeapi.co/api/v2";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const ONE_DAY = 24 * 60 * 60 * 1000;

async function safeGet(url: string) {
  try {
    return await axios.get(url, { httpsAgent });
  } catch {
    return null;
  }
}

export async function fetchFirst150Pokemon(): Promise<PokemonSummary[]> {
  const cache = await PokemonList.findByPk(1);

  if (cache && Date.now() - cache.updated_at < ONE_DAY) {
    return JSON.parse(cache.data);
  }

  const res = await safeGet(`${BASE_URL}/pokemon?limit=150`);
  if (!res) return cache ? JSON.parse(cache.data) : [];

  const results = res.data.results;
  const detailed: PokemonSummary[] = [];

  for (const item of results) {
    const detail = await safeGet(item.url);
    if (!detail) continue;
    const d = detail.data;
    detailed.push({
      id: d.id,
      name: d.name,
      image: d.sprites.other["official-artwork"].front_default,
      types: d.types.map((t: any) => t.type.name),
    });
  }

  await PokemonList.upsert({
    id: 1,
    data: JSON.stringify(detailed),
    updated_at: Date.now(),
  });

  return detailed;
}

export async function fetchPokemonDetail(name: string): Promise<DetailType> {
  const pRes = await safeGet(`${BASE_URL}/pokemon/${name}`);

  if (!pRes) {
    throw new Error(`Failed to fetch data for Pokémon: ${name}`);
  }

  const data = pRes.data;

  const image =
    data.sprites.other?.["official-artwork"]?.front_default ||
    data.sprites.front_default ||
    "";

  const types = data.types.map((t: any) => t.type.name);
  const abilities = data.abilities.map((a: any) => a.ability.name);

  const sRes = await safeGet(data.species.url);
  if (!sRes) {
    throw new Error(`Failed to fetch species data for ${name}`);
  }

  const chainRes = await safeGet(sRes.data.evolution_chain.url);
  if (!chainRes) {
    throw new Error(`Failed to fetch evolution chain for ${name}`);
  }

  const chain = chainRes.data.chain;
  const evolutions: string[] = [];

  const traverse = (node: any) => {
    if (!evolutions.includes(node.species.name)) {
      evolutions.push(node.species.name);
    }
    node.evolves_to?.forEach((child: any) => traverse(child));
  };

  traverse(chain);

  const result: DetailType = {
    id: data.id,
    name: data.name,
    image,
    types,
    abilities,
    evolutions,
  };

  await PokemonDetail.upsert({
    name,
    data: JSON.stringify(result),
    updated_at: Date.now(),
  });

  return result;
}
