import { render, screen } from '@testing-library/react';
import ProductsCount from './ProductsCount';

describe('ProductsCount Component', () => {
  it('renderiza correctamente el componente con count = 1', () => {
    render(<ProductsCount count={1} />);

    expect(screen.getByText('CART (1)')).toBeInTheDocument();
  });

  it('renderiza correctamente el componente con count > 1', () => {
    render(<ProductsCount count={5} />);

    expect(screen.getByText('CART (5)')).toBeInTheDocument();
  });

  it('renderiza correctamente el componente con count = 0', () => {
    render(<ProductsCount count={0} />);

    expect(screen.getByText('CART (0)')).toBeInTheDocument();
  });
});