import React from 'react';
import './Features.css';

const Features = () => {
  const featuresData = [
    {
      id: 1,
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with optimized workflows that boost your productivity.'
    },
    {
      id: 2,
      icon: '🚀',
      title: 'Real-Time Collaboration',
      description: 'Work seamlessly with your team in real-time, no matter where you are in the world.'
    },
    {
      id: 3,
      icon: '🎨',
      title: 'Intuitive Design',
      description: 'Beautiful, user-friendly interfaces that make complex tasks feel effortlessly simple.'
    },
    {
      id: 4,
      icon: '🔒',
      title: 'Enterprise Security',
      description: 'Bank-level security protocols to keep your data safe and your mind at ease.'
    },
    {
      id: 5,
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Gain powerful insights with advanced analytics that help you make informed decisions.'
    },
    {
      id: 6,
      icon: '🌐',
      title: 'Global Scale',
      description: 'Built to scale globally with robust infrastructure that grows with your business.'
    }
  ];

  return (
    <section id="features" className="features">
      <div className="features-container">
        <div className="features-header">
          <h2 className="features-title">Powerful Features</h2>
          <p className="features-subtitle">
            Everything you need to build exceptional digital experiences
          </p>
        </div>
        
        <div className="features-grid">
          {featuresData.map((feature, index) => (
            <div 
              key={feature.id} 
              className="feature-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">
                {feature.title}
              </h3>
              <p className="feature-description">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;