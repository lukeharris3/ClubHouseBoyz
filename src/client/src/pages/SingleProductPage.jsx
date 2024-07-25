import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`postgresql://clubhousehomie35_user:hSpbSCfrk2oFMmMZ6As2RKebl36ixoD2@dpg-cqggumiju9rs73ce8uu0-a.oregon-postgres.render.com/clubhousehomie35${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  const handleAddToCart = () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cartItems.findIndex(item => item.id === product.id);

    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += quantity;
    } else {
      cartItems.push({ ...product, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));
    setConfirmation('Product added to cart!');
    setTimeout(() => setConfirmation(''), 2000); 
  };

  const handleFavorite = () => {
    const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    if (!favoriteProducts.some(fav => fav.id === product.id)) {
      favoriteProducts.push(product);
      localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
      setConfirmation('Product added to favorites!');
      setTimeout(() => setConfirmation(''), 2000); 
    } else {
      setConfirmation('Product is already in favorites!');
      setTimeout(() => setConfirmation(''), 2000); 
    }
  };

  const handleBackClick = () => {
    navigate('/products');
  };

  return (
    <div className="single-product-page">
      <button className="back-button2" onClick={handleBackClick}>
        Back to Products
      </button>
      <div className="product-details">
        <img src={product.image_url} alt={product.name} className="product-image-large" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <h3>{product.brand_name}</h3>
          <p>{product.description}</p>
          <p className="product-price">${parseFloat(product.price).toFixed(2)}</p>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
          <button className="btn btn-cart" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn btn-favorite" onClick={handleFavorite}>
            <i className="fas fa-heart"></i>
          </button>
          {confirmation && <p className="confirmation-message">{confirmation}</p>}
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
