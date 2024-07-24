import React, { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const { user, setUser } = useAuth();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);

  useEffect(() => {
    const storedFavoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    const storedFavoriteCourses = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
    setFavoriteProducts(storedFavoriteProducts);
    setFavoriteCourses(storedFavoriteCourses);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const removeFavoriteProduct = (id) => {
    const updatedFavorites = favoriteProducts.filter(product => product.id !== id);
    setFavoriteProducts(updatedFavorites);
    localStorage.setItem('favoriteProducts', JSON.stringify(updatedFavorites));
  };

  const removeFavoriteCourse = (id) => {
    const updatedFavorites = favoriteCourses.filter(course => course.id !== id);
    setFavoriteCourses(updatedFavorites);
    localStorage.setItem('favoriteCourses', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="account-page">
      <h1>Welcome back, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Log out</button>

      <div className="favorites-section">
        <h2>{user.username}'s Favorite Products</h2>
        {favoriteProducts.length > 0 ? (
          <ul className="favorites-list">
            {favoriteProducts.map((product) => (
              <li key={product.id} className="favorite-item">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image_url} alt={product.name} className="favorite-image" />
                </Link>
                <div className="favorite-item-content">
                  <Link to={`/products/${product.id}`}>
                    <h3>{product.name}</h3>
                  </Link>
                  <p>${parseFloat(product.price).toFixed(2)}</p>
                </div>
                <button onClick={() => removeFavoriteProduct(product.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite products.</p>
        )}
      </div>

      <div className="favorites-section">
        <h2>{user.username}'s Favorite Courses</h2>
        {favoriteCourses.length > 0 ? (
          <ul className="favorites-list">
            {favoriteCourses.map((course) => (
              <li key={course.id} className="favorite-item">
                <Link to={`/courses/${course.id}`}>
                  <img src={course.image_url} alt={course.name} className="favorite-image" />
                </Link>
                <div className="favorite-item-content">
                  <Link to={`/courses/${course.id}`}>
                    <h3>{course.name}</h3>
                  </Link>
                  <p>{course.address}</p>
                </div>
                <button onClick={() => removeFavoriteCourse(course.id)}>Remove</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorite courses.</p>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
