import React, { useTransition } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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

const CTASection = React.memo(() => {
  const navigate = useNavigate();
  const [, startTransition] = useTransition();

  const handleCardClick = (cardTitle: string) => {
    startTransition(() => {
      switch (cardTitle) {
        case 'For Recruiters':
          navigate('/recruiters');
          break;
        case 'For Sponsors':
          navigate('/sponsors');
          break;
        case 'Learn More':
          navigate('/learn-more');
          break;
        default:
          break;
      }
    });
  };
  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-slate-50/60 via-slate-100/70 to-slate-50/60 dark:bg-none transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="h-full p-8 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 flex flex-col items-center text-center shadow-sm dark:shadow-none hover:shadow-md transition-all duration-500 relative"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                  transition: { type: 'spring', stiffness: 400, damping: 25 }
                }}
                style={{ willChange: 'transform' }}
              >
                {/* Color glow effect on hover - same as feature cards */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                
                {/* Content wrapper with relative z-index */}
                <div className="relative z-10 w-full flex flex-col items-center h-full">
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
                    onClick={() => handleCardClick(card.title)}
                    className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r ${card.gradient} text-white font-semibold flex items-center justify-center gap-2 shadow-lg ${card.shadowColor} hover:shadow-xl transition-shadow duration-300`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;
