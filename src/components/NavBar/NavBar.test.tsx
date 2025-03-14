import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import { useCartStore } from '../../store/cartStore';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('../../store/cartStore', () => ({
  useCartStore: jest.fn(),
}));

jest.mock('react-icons/sl', () => ({
  SlBag: () => <span data-testid="cart-icon">Cart Icon</span>,
}));

describe('Navbar Component', () => {
  const mockNavigate = jest.fn();
  const mockLocation = { pathname: '/' };
  const mockCartCount = 3;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ getTotalItems: () => mockCartCount })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el ícono de home y el ícono del carrito', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.getByAltText('Home')).toBeInTheDocument();
    expect(screen.getByTestId('cart-icon')).toBeInTheDocument();
    expect(screen.getByText(mockCartCount.toString())).toBeInTheDocument();
  });

  it('navega a la ruta de inicio al hacer clic en el ícono de home', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByAltText('Home'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('navega a la ruta del carrito al hacer clic en el ícono del carrito', () => {
    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('cart-icon'));
    expect(mockNavigate).toHaveBeenCalledWith('/cart');
  });

  it('muestra la barra de carga cuando isLoading es true', () => {
    render(
      <MemoryRouter>
        <NavBar isLoading={true} />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading-bar')).toBeInTheDocument();
  });

  it('oculta el ícono del carrito en la vista del carrito', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/cart' });

    render(
      <MemoryRouter>
        <NavBar />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('cart-icon')).not.toBeInTheDocument();
  });
});