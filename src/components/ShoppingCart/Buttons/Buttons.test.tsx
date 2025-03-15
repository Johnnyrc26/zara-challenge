import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Buttons from './Buttons';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockAlert = jest.fn();
window.alert = mockAlert;

describe('Buttons Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el componente', () => {
    render(
      <MemoryRouter>
        <Buttons totalPrice={100} />
      </MemoryRouter>
    );

    expect(screen.getByText('CONTINUE SHOPPING')).toBeInTheDocument();
    expect(screen.getByText('TOTAL 100.00 EUR')).toBeInTheDocument();
    expect(screen.getByText('PAY')).toBeInTheDocument();
  });

  it('navega a la ruta de inicio al hacer clic en "CONTINUE SHOPPING"', () => {
    render(
      <MemoryRouter>
        <Buttons totalPrice={100} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('CONTINUE SHOPPING'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('muestra un alert al hacer clic en "PAY"', () => {
    render(
      <MemoryRouter>
        <Buttons totalPrice={100} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('PAY'));
    expect(mockAlert).toHaveBeenCalledWith('Proceeding to payment...');
  });

  it('deshabilita el botón "PAY" cuando totalPrice es 0', () => {
    render(
      <MemoryRouter>
        <Buttons totalPrice={0} />
      </MemoryRouter>
    );

    expect(screen.getByText('PAY')).toBeDisabled();
  });
});