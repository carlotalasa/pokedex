import React, { useContext, useEffect, useState } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';
import PokemonList from '../components/PokemonList';
import { getPokemonDetails } from '../services/api';

const FavoritesPage = () => {
  const { favorites } = useContext(FavoriteContext);
  const [favoritePokemons, setFavoritePokemons] = useState([]);

  useEffect(() => {
    const fetchFavoritePokemons = async () => {
      const pokemons = await Promise.all(
        favorites.map(async (id) => {
          const data = await getPokemonDetails(id);
          return data;
        })
      );
      setFavoritePokemons(pokemons);
    };

    fetchFavoritePokemons();
  }, [favorites]);

  return (
    <div>
      {favoritePokemons.length > 0 ? (
        <PokemonList pokemons={favoritePokemons} />
      ) : (
        <div className="message">
          <p>No favorites yet.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;