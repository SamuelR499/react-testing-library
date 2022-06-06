import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto  de links:', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent(/home/i);
    expect(favoritePokemonsLink).toBeInTheDocument();
    expect(favoritePokemonsLink).toHaveTextContent(/favorite pokémons/i);
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveTextContent(/about/i);
  });
  test('Teste se é redirecionado para a URL / ao clicar no link Home', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    const { history } = renderWithRouter(<App />);
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Teste se é redirecionado para a URL /about ao clicar no link About', async () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  test('Se é redirecionado para /favorites ao clicar no link de favoritos', async () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const title = screen.getByRole('heading', { name: /favorite pokémons/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se é redirecionado para notFound ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/notfound');
    const notFoundTitle = screen.getByRole('heading',
      { name: /page requested not found*/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
});
