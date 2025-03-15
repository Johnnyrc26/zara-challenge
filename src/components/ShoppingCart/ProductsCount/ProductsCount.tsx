import React from 'react';
import './ProductsCount.css';

interface ProductsCountProps {
  count: number;
}

const ProductsCount: React.FC<ProductsCountProps> = ({ count }) => {
  return (
    <div className="products-count">
     <span>CART ({count}{count === 1}) </span>
    </div>
  );
};

export default ProductsCount;