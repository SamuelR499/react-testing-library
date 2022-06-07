import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const infoPokemon = screen.getByText(/This application simulates a Pokédex, a dig*/i);

    expect(infoPokemon).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex;', () => {
    renderWithRouter(<About />);
    const multiText = screen.getAllByText(/pokémons/i);
    expect(multiText.length).toEqual(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img', { src: 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png' });
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
