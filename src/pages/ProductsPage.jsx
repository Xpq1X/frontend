import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Axios for API calls
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Our Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map(product => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                {product.image && <img src={`http://localhost/storage/${product.image}`} alt={product.name} />}
                <Link to={`/products/${product.id}`}>View Details</Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
