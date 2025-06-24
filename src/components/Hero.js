import React from 'react';
import { Link } from 'react-scroll';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Snowman
          </h1>
          <p className="hero-subtitle">
            Crafting immersive digital experiences
          </p>
          <Link
            to="features"
            smooth={true}
            duration={500}
            className="hero-cta"
          >
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;