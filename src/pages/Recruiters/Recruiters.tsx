import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Briefcase, Users, Target, CheckCircle, ArrowRight, Snowflake } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShineEffect from '@/components/ShineEffect';

const features = [
  {
    icon: Target,
    title: 'Curated Talent Pool',
    description: 'Access pre-screened professionals with verified skills and portfolios.',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    icon: Users,
    title: 'Advanced Matching',
    description: 'AI-powered matching system connects you with the perfect candidates.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'Every candidate goes through our rigorous vetting process.',
    gradient: 'from-violet-400 to-purple-500',
  },
];

const pricingFeatures = [
  'Access to 10,000+ verified professionals',
  'Advanced search and filtering tools',
  'Direct messaging with candidates',
  'Portfolio and skill assessments',
  'Priority support and consultation',
  'Analytics and hiring insights',
];

const Recruiters = React.memo(() => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // In a real app, this would handle subscription
    navigate('/create');
  };

  return (
    <div className="min-h-screen dark:bg-none transition-colors duration-700">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 dark:from-sky-900/30 dark:to-blue-900/30 mb-8"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Briefcase className="w-10 h-10 text-sky-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-slate-800 dark:text-white">Find </span>
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                exceptional talent
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Build your dream team with our curated network of verified professionals and innovative creators.
            </motion.p>
          </motion.div>

          {/* Features Grid */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <ShineEffect key={feature.title} className="h-full">
                  <motion.div
                    className="group relative p-6 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-500 h-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    whileHover={{ 
                      y: -8,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                      transition: { type: 'spring', stiffness: 400, damping: 25 }
                    }}
                    style={{ willChange: 'transform' }}
                  >
                    {/* Glow effect on hover */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-5 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <feature.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                </ShineEffect>
              ))}
            </div>
          </section>

          {/* Pricing Section */}
          <section className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Simple, transparent{' '}
                <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
                  pricing
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Everything you need to find and hire the best talent.
              </p>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-500"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                
                <div className="relative z-10 text-center">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-slate-800 dark:text-white">₹2,999</span>
                      <span className="text-lg text-slate-600 dark:text-slate-400">/month</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Professional recruiting plan</p>
                  </div>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-3 mb-8 text-left">
                    {pricingFeatures.map((feature, index) => (
                      <motion.div
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <ShineEffect className="w-full max-w-sm mx-auto">
                    <motion.button
                      onClick={handleGetStarted}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      Get Started Today
                      <motion.span
                        initial={{ x: 0 }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.span>
                    </motion.button>
                  </ShineEffect>
                </div>
              </motion.div>
            </motion.div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
});

Recruiters.displayName = 'Recruiters';

export default Recruiters;