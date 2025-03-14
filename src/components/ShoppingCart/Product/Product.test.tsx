import { render, screen, fireEvent } from '@testing-library/react';
import Product from './Product';

describe('Product Component', () => {
  const mockItem = {
    id: '1',
    name: 'iPhone 15 Pro',
    imageUrl: 'https://example.com/iphone.jpg',
    capacity: '128GB',
    color: 'Black',
    price: 999,
    quantity: 1,
  };

  const mockOnRemove = jest.fn();

  it('renderiza correctamente el componente con los datos proporcionados', () => {
    render(<Product item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText('IPHONE 15 PRO')).toBeInTheDocument();
    expect(screen.getByText('128GB |')).toBeInTheDocument();
    expect(screen.getByText('BLACK')).toBeInTheDocument();
    expect(screen.getByText('999 EUR')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(screen.getByAltText('iPhone 15 Pro')).toHaveAttribute(
      'src',
      'https://example.com/iphone.jpg'
    );
  });

  it('llama a la función onRemove al hacer clic en el botón "Remove"', () => {
    render(<Product item={mockItem} onRemove={mockOnRemove} />);

    fireEvent.click(screen.getByText('Remove'));
    expect(mockOnRemove).toHaveBeenCalled();
  });
});