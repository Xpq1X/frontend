import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Import your custom cart hook

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { cart, setCart } = useCart();  // Use cart from context

  const handleAddToCart = () => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item.id === product.id);

    if (productIndex !== -1) {
      // If the product already exists in the cart, increase its quantity
      updatedCart[productIndex].quantity += 1;
    } else {
      // If the product doesn't exist in the cart, add it
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Save to localStorage
  };

  useEffect(() => {
    // Fetch product details from API
    axios.get(`/api/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.log('Error fetching product details:', error);
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
