export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonSummary {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  abilities: string[];
  types: string[];
  evolutions: string[];
}
