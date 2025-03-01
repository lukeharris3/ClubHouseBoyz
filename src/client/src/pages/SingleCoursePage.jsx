import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

const SingleCoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [confirmation, setConfirmation] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/golfcourses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course) {
    return <p>Loading...</p>;
  }

  const handleFavorite = () => {
    const favoriteCourses = JSON.parse(localStorage.getItem('favoriteCourses')) || [];
    if (!favoriteCourses.some(fav => fav.id === course.id)) {
      favoriteCourses.push(course);
      localStorage.setItem('favoriteCourses', JSON.stringify(favoriteCourses));
      setConfirmation('Course added to favorites!');
      setTimeout(() => setConfirmation(''), 2000); 
    } else {
      setConfirmation('Course is already in favorites!');
      setTimeout(() => setConfirmation(''), 2000); 
    }
  };

  const handleBackClick = () => {
    navigate('/courses');
  };

  return (
    <div className="single-course-page">
      <button className="back-button" onClick={handleBackClick}>
        Back to Courses
      </button>
      <img src={course.image_url} alt={course.name} className="course-image" />
      <h1>{course.name}</h1>
      <div className="course-details">
        <p className="course-location">{course.address}, {course.phone}</p>
        <p className="course-description">{course.description}</p>
        <div className="course-pricing">
          <p>Price for 9 holes: ${course.price_for_9}</p>
          <p>Price for 18 holes: ${course.price_for_18}</p>
        </div>
        <button className="btn btn-favorite" onClick={handleFavorite}>
          <i className="fas fa-heart"></i>
        </button>
        {confirmation && <p className="confirmation-message">{confirmation}</p>}
      </div>
    </div>
  );
};

export default SingleCoursePage;
