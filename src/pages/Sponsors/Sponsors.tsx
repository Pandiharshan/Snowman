import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, TrendingUp, CheckCircle, ArrowRight, Megaphone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShineEffect from '@/components/ShineEffect';

const benefits = [
  {
    icon: Eye,
    title: 'Maximum Visibility',
    description: 'Reach thousands of engaged creators and innovators in our community.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: TrendingUp,
    title: 'Brand Growth',
    description: 'Accelerate your brand awareness among tech-savvy professionals.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Megaphone,
    title: 'Targeted Reach',
    description: 'Connect with your ideal audience through our precision targeting.',
    gradient: 'from-rose-400 to-pink-500',
  },
];

const sponsorshipFeatures = [
  'Featured placement on homepage',
  'Newsletter mentions (50K+ subscribers)',
  'Social media promotion',
  'Custom branded content opportunities',
  'Analytics and performance reports',
  'Direct access to community insights',
];

const Sponsors = React.memo(() => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // In a real app, this would handle sponsorship inquiry
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 mb-8"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Building2 className="w-10 h-10 text-violet-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-slate-800 dark:text-white">Partner with </span>
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Snowman
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Reach a passionate community of innovators and creators. Amplify your brand with our engaged audience.
            </motion.p>
          </motion.div>

          {/* Benefits Grid */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <ShineEffect key={benefit.title} className="h-full">
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
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center mb-5 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <benefit.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </motion.div>
                </ShineEffect>
              ))}
            </div>
          </section>

          {/* Sponsorship Package */}
          <section className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Sponsorship{' '}
                <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                  packages
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Comprehensive visibility and engagement opportunities.
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
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-500 to-purple-600 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                
                <div className="relative z-10 text-center">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-slate-800 dark:text-white">₹4,999</span>
                      <span className="text-lg text-slate-600 dark:text-slate-400">/month</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Premium sponsorship package</p>
                  </div>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-3 mb-8 text-left">
                    {sponsorshipFeatures.map((feature, index) => (
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
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      Become a Sponsor
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

Sponsors.displayName = 'Sponsors';

export default Sponsors;