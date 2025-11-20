import { Favorite } from "../db/model/favorite";

export async function getFavorites(): Promise<string[]> {
  const favorites = await Favorite.findAll({ attributes: ["name"] });
  return favorites.map((f) => f.name);
}

export async function addFavorite(name: string): Promise<string[]> {
  const normalized = name.toLowerCase();

  await Favorite.findOrCreate({ where: { name: normalized } });

  return getFavorites();
}

export async function removeFavorite(name: string): Promise<string[]> {
  const normalized = name.toLowerCase();

  await Favorite.destroy({ where: { name: normalized } });

  return getFavorites();
}
