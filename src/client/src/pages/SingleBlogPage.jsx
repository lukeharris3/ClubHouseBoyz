import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/main.css';

const SingleBlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`postgresql://clubhousehomie35_user:hSpbSCfrk2oFMmMZ6As2RKebl36ixoD2@dpg-cqggumiju9rs73ce8uu0-a.oregon-postgres.render.com/clubhousehomie35${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <p>Loading...</p>;
  }

  return (
    <div className="single-blog-page">
      <h1>{blog.title}</h1>
      <p>by {blog.author}</p>
      <p>{new Date(blog.created_at).toLocaleDateString()}</p>
      <img src={blog.image_url} alt={blog.title} className="blog-image" />
      <div className="blog-content">
        <p>{blog.content}</p>
      </div>
    </div>
  );
};

export default SingleBlogPage;
