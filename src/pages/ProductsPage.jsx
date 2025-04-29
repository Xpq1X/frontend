/* import React, { useEffect, useState } from 'react';
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
*/
/* ProductsPage.jsx (working desktop version) */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { mockProducts } from '../mockProducts';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        setProducts(mockProducts);
        setLoading(false);
      } catch (e) {
        console.error('Error loading mock products:', e);
        setError('Failed to load products');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
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
              {product.image && <img src={product.image} alt={product.name} />}
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
