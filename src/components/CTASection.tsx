import React from 'react';
import { motion } from 'framer-motion';
import ShineEffect from './ShineEffect';
import { Briefcase, Building2, BookOpen, ArrowRight } from 'lucide-react';

const ctaCards = [
  {
    icon: Briefcase,
    title: 'For Recruiters',
    description: 'Discover exceptional talent and build your dream team with our curated network.',
    buttonText: 'Find Talent',
    gradient: 'from-sky-500 to-blue-600',
    shadowColor: 'shadow-sky-500/25',
  },
  {
    icon: Building2,
    title: 'For Sponsors',
    description: 'Partner with us to reach a passionate community of innovators and creators.',
    buttonText: 'Become a Sponsor',
    gradient: 'from-violet-500 to-purple-600',
    shadowColor: 'shadow-violet-500/25',
  },
  {
    icon: BookOpen,
    title: 'Learn More',
    description: 'Explore our comprehensive resources and discover what Snowman can do for you.',
    buttonText: 'Explore Now',
    gradient: 'from-emerald-500 to-teal-600',
    shadowColor: 'shadow-emerald-500/25',
  },
];

const CTASection = () => {
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-white to-sky-50/50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Ready to{' '}
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              get started?
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Choose your path and begin your journey with Snowman today.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {ctaCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.7 }}
            >
              <motion.div
                className="h-full p-8 rounded-3xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center text-center transition-all duration-500"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                }}
              >
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-3xl bg-gradient-to-r ${card.gradient} flex items-center justify-center mb-6 shadow-xl ${card.shadowColor}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <card.icon className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                  {card.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow">
                  {card.description}
                </p>

                <ShineEffect className="w-full">
                  <motion.button
                    className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${card.gradient} text-white font-semibold flex items-center justify-center gap-2 shadow-lg ${card.shadowColor} hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {card.buttonText}
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.button>
                </ShineEffect>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
