import React from 'react';
import './HomePage.css';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <section className="homepage-section">
          <Hero />
        </section>

        <section className="homepage-section">
          <Features />
        </section>

        <section className="homepage-section">
          <About />
        </section>

        <section className="homepage-section">
          <Contact />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
