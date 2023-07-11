import React from 'react';
import { ProductDOT } from '../Types';

interface ProductItemProps {
  product: ProductDOT;
}

const Product: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <div className="p-4 bg-white shadow">
      <h3 className="text-lg font-medium">{product.title}</h3>
      <p className="text-gray-500">${product.price}</p>
      <img src={product.imageURL} alt={product.title} className="w-full h-40 object-contain mt-4" />
    </div>
  );
};

export default Product;
