import React from 'react';
import './ProductsCount.css';

interface ProductsCountProps {
  count: number;
}

const ProductsCount: React.FC<ProductsCountProps> = ({ count }) => {
  return (
    <div className="products-count">
      {count} {count === 1 ? 'item' : 'items'} in cart
    </div>
  );
};

export default ProductsCount;