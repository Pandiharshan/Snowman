import React from 'react';
import './FeaturesPage.css';

const FeaturesPage = () => {
  return (
    <div className="features-page">
      {/* Hero Section with Main Title */}
      <section className="features-page__hero">
        <h1 className="page-title">Explore Our Features</h1>
        <p className="features-page__subtitle">
          Discover the powerful tools that make Snowman the future of digital collaboration
        </p>
      </section>

      {/* Main Features Grid Section */}
      <section className="features-page__section">
        {/* Feature 1: Immersive 3D Collaboration */}
        <div className="features-page__feature">
          <div className="feature-image-placeholder features-page__image">
            <div className="placeholder-icon">🌐</div>
          </div>
          <div className="features-page__content">
            <h2 className="features-page__title">Immersive 3D Collaboration</h2>
            <p className="features-page__description">
              Collaborate in real-time within immersive 3D workspaces designed for creativity and productivity. 
              Experience a new dimension of teamwork that brings your ideas to life.
            </p>
          </div>
        </div>

        {/* Feature 2: AI-Powered Insights */}
        <div className="features-page__feature">
          <div className="feature-image-placeholder features-page__image">
            <div className="placeholder-icon">🧠</div>
          </div>
          <div className="features-page__content">
            <h2 className="features-page__title">AI-Powered Insights</h2>
            <p className="features-page__description">
              Get actionable recommendations powered by advanced AI to help your team make smarter decisions faster. 
              Intelligence that adapts to your workflow.
            </p>
          </div>
        </div>

        {/* Feature 3: Secure Cloud Infrastructure */}
        <div className="features-page__feature">
          <div className="feature-image-placeholder features-page__image">
            <div className="placeholder-icon">🔒</div>
          </div>
          <div className="features-page__content">
            <h2 className="features-page__title">Secure Cloud Infrastructure</h2>
            <p className="features-page__description">
              Enterprise-grade security with seamless cloud integration to protect your data at all times. 
              Trust in technology that scales with your business.
            </p>
          </div>
        </div>

        {/* Feature 4: Real-time Synchronization */}
        <div className="features-page__feature">
          <div className="feature-image-placeholder features-page__image">
            <div className="placeholder-icon">⚡</div>
          </div>
          <div className="features-page__content">
            <h2 className="features-page__title">Real-time Synchronization</h2>
            <p className="features-page__description">
              Stay in perfect sync with your team across all devices and platforms. 
              Changes happen instantly, keeping everyone on the same page.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="features-page__additional">
        <h2 className="features-page__section-title">More Powerful Features</h2>
        <div className="features-page__grid">
          <div className="features-page__mini-feature">
            <h3>Cross-Platform Support</h3>
            <p>Works seamlessly across desktop, mobile, and web platforms</p>
          </div>
          <div className="features-page__mini-feature">
            <h3>Advanced Analytics</h3>
            <p>Deep insights into team performance and project progress</p>
          </div>
          <div className="features-page__mini-feature">
            <h3>Custom Integrations</h3>
            <p>Connect with your favorite tools and workflows</p>
          </div>
          <div className="features-page__mini-feature">
            <h3>24/7 Support</h3>
            <p>Expert support whenever you need it, around the clock</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;