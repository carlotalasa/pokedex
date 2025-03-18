import React, { createContext, useState, useEffect } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')));

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};