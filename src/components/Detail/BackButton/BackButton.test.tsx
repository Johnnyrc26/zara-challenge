import { render, screen, fireEvent } from '@testing-library/react';
import BackButton from './BackButton';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-icons/ri', () => ({
  RiArrowLeftSLine: () => <span data-testid="arrow-icon" />,
}));

describe('BackButton Component', () => {
  const mockNavigate = jest.fn();
  
  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza correctamente el botón con el icono y texto', () => {
    render(<BackButton />);
    
    expect(screen.getByText(/Back/i)).toBeInTheDocument();
    expect(screen.getByTestId('arrow-icon')).toBeInTheDocument();
  });

  it('navega hacia atrás cuando hay historial', () => {
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 2,
    });

    render(<BackButton />);
    fireEvent.click(screen.getByText(/Back/i));
    
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('navega a la ruta de fallback cuando no hay historial', () => {
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 1,
    });

    render(<BackButton fallbackRoute="/dashboard" />);
    fireEvent.click(screen.getByText(/Back/i));
    
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('usa la ruta por defecto (/ ) cuando no se provee fallbackRoute', () => {
    Object.defineProperty(window.history, 'length', {
      configurable: true,
      value: 1,
    });

    render(<BackButton />);
    fireEvent.click(screen.getByText(/Back/i));
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});