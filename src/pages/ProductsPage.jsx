import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../Api'; // use the new api file
import '../styles/ProductsPage.css';
import { useCart } from '../context/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API error:', err);
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  return (
    <div className="products-container">
      <h1>Our Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              {product.image && (
                <img
                
                src={`http://127.0.0.1:8000/storage/${product.image}`}

                  alt={product.name}
                />
              )}
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p><strong>Price: ${product.price}</strong></p>
              <div className="button-group">
                <Link to={`/products/${product.id}`} className="details-btn">Details</Link>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
