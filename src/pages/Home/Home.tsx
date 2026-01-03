import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import FeedbackSection from '@/components/FeedbackSection';
import Footer from '@/components/Footer';

const Home = () => {
  const { username, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background transition-colors duration-700">
      <Navbar />
      <main>
        <HeroSection username={username} />
        <FeaturesSection />
        <CTASection />
        <FeedbackSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
