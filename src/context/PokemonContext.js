import React, { createContext, useState, useEffect } from 'react';
import { getPokemons } from '../services/api';

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getPokemons();
        setPokemons(data);
      } catch (error) {
        console.error('Error ', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemons, isLoading }}>
      {children}
    </PokemonContext.Provider>
  );
};