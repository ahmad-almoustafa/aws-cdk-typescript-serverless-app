import React, { useEffect, useState } from 'react';
import { ProductDOT } from '../Types';
import Product from './Product';
import { DataService } from '../../services/DataService';

interface ProductsProps {
    dataService: DataService;
}

const Products: React.FC<ProductsProps> = ({ dataService }) => {
    const [products, setProducts] = useState<ProductDOT[]>([]);  
    useEffect(()=>{
        const getProducts  = async ()=>{
            console.log('getting spaces....')
            const products = await dataService.getProducts ();
            setProducts(products);
        }
        getProducts();
    }, [])
    
    return (
    <div>
    <h1>Product List</h1>
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
    </div>
  );
};

export default Products;


