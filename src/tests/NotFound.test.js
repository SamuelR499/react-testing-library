import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  test('se a página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen.getByRole('heading',
      { name: /page requested not found*/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
  test('', () => {
    renderWithRouter(<NotFound />);
    const imgTriste = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(imgTriste.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
