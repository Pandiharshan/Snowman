import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Crown, Sparkles, Zap, Shield, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShineEffect from '@/components/ShineEffect';

const premiumFeatures = [
  {
    icon: Zap,
    title: 'Priority Processing',
    description: 'Skip the queue with lightning-fast generation times.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Sparkles,
    title: 'Advanced Models',
    description: 'Access to the latest and most powerful AI models.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Commercial License',
    description: 'Use your creations for commercial purposes without restrictions.',
    gradient: 'from-emerald-400 to-teal-500',
  },
];

const premiumBenefits = [
  'Unlimited high-resolution generations',
  'Access to exclusive AI models',
  'Priority customer support',
  'Commercial usage rights',
  'Advanced editing tools',
  'Batch processing capabilities',
  'Custom style training',
  'API access for developers',
];

const Premium = React.memo(() => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    // In a real app, this would handle premium subscription
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 mb-8"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Crown className="w-10 h-10 text-amber-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-slate-800 dark:text-white">Unlock </span>
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Premium
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Experience the full power of Snowman with premium features designed for professionals and power users.
            </motion.p>
          </motion.div>

          {/* Premium Features */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              {premiumFeatures.map((feature, index) => (
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

          {/* Access Control Notice */}
          <section className="mb-20">
            <motion.div
              className="relative group max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <motion.div
                className="p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-500 text-center"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Lock className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
                    Premium Access Required
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                    This section is exclusively available to premium subscribers. 
                    Upgrade your account to unlock advanced features and capabilities.
                  </p>
                </div>
              </motion.div>
            </motion.div>
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
                Premium{' '}
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                  subscription
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Unlock the full potential of your creativity.
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
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                
                <div className="relative z-10 text-center">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-slate-800 dark:text-white">₹1,999</span>
                      <span className="text-lg text-slate-600 dark:text-slate-400">/month</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">Premium creative suite</p>
                  </div>

                  {/* Features */}
                  <div className="grid md:grid-cols-2 gap-3 mb-8 text-left">
                    {premiumBenefits.map((benefit, index) => (
                      <motion.div
                        key={benefit}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <ShineEffect className="w-full max-w-sm mx-auto">
                    <motion.button
                      onClick={handleUpgrade}
                      className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      Upgrade to Premium
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

Premium.displayName = 'Premium';

export default Premium;