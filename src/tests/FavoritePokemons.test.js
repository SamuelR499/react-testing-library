import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';
import pokemons from '../data';

// console.log(pokemons);
describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido "No favorite pokemon found";', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<FavoritePokemons
      pokemons={ [pokemons[0]] }
    />);
    const pokemonFavorit = screen.getByText(/pikachu/i);
    expect(pokemonFavorit).toBeInTheDocument();
  });
});
