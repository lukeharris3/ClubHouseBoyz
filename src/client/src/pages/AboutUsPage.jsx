import React from 'react';

const AboutUsPage = () => {
  return (
    <div className="about-page">
      <img 
        src="https://images.wsj.net/im-970761/?width=1278&size=1" 
        alt="Golf Course" 
        className="about-image"
      />
      <h1>About Us</h1>
      <ul className="about-list">
        <li>
          Welcome to ClubHouseHomie, your ultimate Utah Golf destination. Founded in the heart of Utah, we take pride in offering a comprehensive directory of all golf courses in the state. As we look to the future, we are excited to expand our reach beyond Utah's borders.
        </li>
        <li>
          Our passion for the game of golf drives everything we do. We aim to share this love of the game with you, whether you're a seasoned pro or just starting out. Stay informed on all things golf through our ClubHouse Talk page, where you can find the latest news, tips, and stories from the golfing world.
        </li>
        <li>
          On our Products page, you can shop for the best golf gear from top brands, ensuring you have everything you need for a great game. Explore nearby courses on our Courses page and discover new favorite spots to play.
        </li>
        <li>
          Don't forget to create an account to keep track of your favorite courses and products. Join our community and immerse yourself in the wonderful world of golf with ClubHouseHomie!
        </li>
        <li>
          Follow us on Instagram for the latest updates: <a href="https://www.instagram.com/clubhousehomie/" target="_blank" rel="noopener noreferrer" className="instagram-link">ClubHouseHomie</a>
        </li>
      </ul>
    </div>
  );
};

export default AboutUsPage;
