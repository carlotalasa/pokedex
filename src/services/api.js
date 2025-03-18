import axios from 'axios';

const api = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemons = async (limit = 251) => {
  const response = await api.get(`/pokemon/?limit=${limit}`);
  const basicPokemonList = response.data.results;

  const pokemonsWithDetails = await Promise.all(
    basicPokemonList.map(async (pokemon) => {
      const details = await getPokemonDetails(pokemon.name); 
      return details; 
    })
  );
  return pokemonsWithDetails;
};

export const getPokemonDetails = async (id) => {
  const response = await api.get(`/pokemon/${id}`);
  return response.data;
};

