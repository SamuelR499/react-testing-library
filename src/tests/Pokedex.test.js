import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const headingPokdex = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(headingPokdex).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo pokémon da lista.', () => {
    renderWithRouter(<App />);
    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();
    const pokemonsMenosTheFirst = pokemons.slice(1);

    pokemonsMenosTheFirst.forEach((element) => {
      userEvent.click(nextPokemonBtn);
      const pokemonName = screen.getByText(element.name);
      expect(pokemonName).toBeInTheDocument();
    });
    userEvent.click(nextPokemonBtn);
    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez;', () => {
    renderWithRouter(<App />);
    const qttPokemon = screen.getAllByTestId('pokemon-name');
    expect(qttPokemon.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro:', () => {
    renderWithRouter(<App />);
    const btnNames = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const filterBtn = screen.getAllByTestId('pokemon-type-button');
    const BtnAllpokemon = screen.getByRole('button', { name: /All/i });

    filterBtn.forEach((item, index) => {
      expect(item.innerHTML).toBe(btnNames[index]);
      expect(BtnAllpokemon).toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const BtnFirePokemon = screen.getByRole('button', { name: /Fire/i });

    expect(BtnFirePokemon.innerHTML).toBe('Fire');
    userEvent.click(BtnFirePokemon);
    const pokemonFireName = screen.getByText(/Charmander/i);
    expect(pokemonFireName).toBeInTheDocument();

    const BtnAllPokemon = screen.getByRole('button', { name: /All/i });
    expect(BtnAllPokemon.innerHTML).toBe('All');
    userEvent.click(BtnAllPokemon);
    const pokemonName = screen.getByText(/Pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });
});
