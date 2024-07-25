import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('postgresql://clubhousehomie35_user:hSpbSCfrk2oFMmMZ6As2RKebl36ixoD2@dpg-cqggumiju9rs73ce8uu0-a.oregon-postgres.render.com/clubhousehomie35');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <h1>ClubHouse Talk</h1>
      <div className="blogs-grid">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <Link to={`/blog/${blog.id}`}> 
              <img src={blog.image_url} alt={blog.title} className="blog-image" />
              <div className="blog-info">
                <h2>{blog.title}</h2>
                <p>by {blog.author}</p>
                <p>{new Date(blog.created_at).toLocaleDateString()}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
