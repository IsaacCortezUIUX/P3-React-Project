// src/components/ProductDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import axios from 'axios';

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch product details from API
    axios.get(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: 'toLLoejNIzq7R9simI9ZdQtnlI8qZS3fugb1btL0RQifXkSRg2qWUL8R'
      }
    }).then(response => {
      // Generate random price between $30 and $200
      const randomPrice = (Math.random() * (200 - 30) + 30).toFixed(2);
      // Update product data with random price
      const updatedProduct = { 
        ...response.data, 
        price: `$${randomPrice}` 
      };
      setProduct(updatedProduct);
    }).catch(error => {
      console.error("There was an error fetching the product details!", error);
    });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)}>Back</button>
      <img src={product.src.large} alt={product.photographer} />
      <h2>{product.photographer}</h2>
      <p>{product.price}</p>
      <button onClick={() => addToCart({ id: product.id, title: product.photographer, price: product.price })}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetailPage;
