import React from 'react';
import { motion } from 'framer-motion';
import ShineEffect from './ShineEffect';
import { Zap, Shield, Sparkles, Users, Globe, Heart } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security protecting your data around the clock.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'Crafted with attention to detail for an exceptional experience.',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join a thriving community of innovators and creators.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect with opportunities worldwide, without boundaries.',
    gradient: 'from-rose-400 to-pink-500',
  },
  {
    icon: Heart,
    title: 'Built with Love',
    description: 'Every feature designed with care and passion for excellence.',
    gradient: 'from-red-400 to-rose-500',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 px-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-800 dark:to-slate-900 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            Why Snowman?
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Features that{' '}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              stand out
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Discover what makes Snowman the perfect choice for your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ShineEffect key={feature.title} className="h-full">
              <motion.div
                className="group relative p-6 rounded-3xl bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:border-sky-300/50 dark:hover:border-sky-500/30 transition-all duration-500 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                {/* Glow effect on hover - color only visible on hover */}
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
      </div>
    </section>
  );
};

export default FeaturesSection;
