import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import Layout from './Layout';


jest.mock('../NavBar/NavBar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  Outlet: () => <div data-testid="outlet">Outlet</div>, 
}));

describe('Layout Component', () => {
  it('renderiza el Navbar y el Outlet correctamente', () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });
});