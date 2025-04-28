import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch data from API
  useEffect(() => {
    axios.get('/api/products')  // Replace with your actual API endpoint
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1>Our Products</h1>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <Link to={`/products/${product.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
