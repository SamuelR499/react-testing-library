import { screen } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const pokemon = pokemons[0];
const { averageWeight: { value, measurementUnit } } = pokemon;
const isFavorite = true;
// console.log(pokemon);
describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se renderizado um card com as informações de determinado pokémon:', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink={ false }
      isFavorite={ isFavorite }
    />);
    const pokemonName = screen.getByText(pokemon.name);
    const pokemonType = screen.getByText(pokemon.type);
    const pokemonWight = screen.getByText(/average weight:*/i);
    const pokemonimg = screen.getByRole('img', { name: `${pokemon.name} sprite` });

    expect(pokemonName).toBeInTheDocument();

    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType.innerHTML).toBe(pokemon.type);

    expect(pokemonWight).toBeInTheDocument();
    expect(pokemonWight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);

    expect(pokemonimg).toBeDefined();
    expect(pokemonimg.src).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
    expect(pokemonimg.alt).toBe('Pikachu sprite');
  });
  test('Teste se o card do pokémon na Pokédex tem um link para exibir detalhes', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink
      isFavorite={ isFavorite }
    />);
    const detailLink = screen.queryByRole('link', { name: /More details/i });
    expect(detailLink).toBeInTheDocument();
    expect(detailLink.href).toBe('http://localhost/pokemons/25');

    userEvent.click(detailLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('este se existe um ícone de estrela nos pokémons favoritados:', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon }
      showDetailsLink
      isFavorite={ isFavorite }
    />);
    const favorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    console.log(favorite);
    expect(favorite).toBeInTheDocument();
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
    expect(favorite.alt).toBe('Pikachu is marked as favorite');
  });
});
