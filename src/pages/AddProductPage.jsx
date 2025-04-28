import React, { useState } from 'react';
import axios from 'axios';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // New state to handle image file

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', parseFloat(price)); // ensure price is a number
    formData.append('category', category);
    if (image) formData.append('image', image); // Attach the image file

    try {
      // Make the POST request with FormData to handle the image upload
      await axios.post('http://localhost:8000/api/admin/products', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token from localStorage
          'Content-Type': 'multipart/form-data', // Important to handle file uploads
        },
      });
      alert('Product added successfully!');
      setName('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null); // Reset image after submission
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Product Description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Product Price"
            className="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Product Category"
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*" // Accept image files only
            onChange={(e) => setImage(e.target.files[0])} // Set image file when selected
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
