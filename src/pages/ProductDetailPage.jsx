import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../Api'; // ✅ your custom axios instance
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useCart();

  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      updatedCart[productIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetailPage;
