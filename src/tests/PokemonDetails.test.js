import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../pages/PokemonDetails';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do pokémon são mostradas', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const nameDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    const summary = screen.getByRole('heading', { name: /summary/i, leve: 2 });
    const detailsText = screen.getByText(/this intelligent pokémon roasts hard berri*/i);
    expect(nameDetails).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(detailsText).toBeInTheDocument();
  });
  test('se existe uma seção com os mapas contendo as localizações do pokémon:', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById
      match={ { params: { id: '25' } } }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const number = 2;
    const locationTitle = screen
      .getByRole('heading', { name: /game locations of pikachu/i });
    const locationTotal = screen.getAllByRole('img', { name: /pikachu location/i });
    const location1 = screen.getByText(/kanto viridian forest/i);
    const location2 = screen.getByText(/kanto power plant/i);

    expect(locationTitle).toBeInTheDocument();
    expect(locationTotal.length).toEqual(number);
    expect(locationTotal[0]).toBeInTheDocument();
    expect(locationTotal[0].src).toBe('https://pwo-wiki.info/images/4/47/Viridian_Forest.gif');

    expect(locationTotal[1]).toBeInTheDocument();
    expect(locationTotal[1].src).toBe('https://pwo-wiki.info/images/5/5b/Pp.gif');

    expect(location1).toBeInTheDocument();
    expect(location2).toBeInTheDocument();
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes:', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(checkBox).toBeInTheDocument();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBeTruthy();

    userEvent.click(checkBox);
    expect(checkBox.checked).toBeFalsy();
  });
});
