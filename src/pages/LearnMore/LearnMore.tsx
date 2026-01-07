import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Users, Globe, Heart, Snowflake } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShineEffect from '@/components/ShineEffect';

const aboutSections = [
  {
    icon: Target,
    title: 'Our Purpose',
    description: 'Snowman exists to bridge the gap between imagination and creation. We believe everyone has the power to bring their ideas to life, and we provide the tools to make it happen.',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    icon: Users,
    title: 'Our Community',
    description: 'We foster a vibrant ecosystem of creators, innovators, and dreamers. Together, we push the boundaries of what\'s possible in digital creation.',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    icon: Globe,
    title: 'Our Vision',
    description: 'To democratize creativity and make advanced creation tools accessible to everyone, regardless of their technical background or experience level.',
    gradient: 'from-emerald-400 to-teal-500',
  },
];

const values = [
  {
    title: 'Innovation First',
    description: 'We constantly push the envelope to deliver cutting-edge creative tools.',
  },
  {
    title: 'User-Centric Design',
    description: 'Every feature is crafted with our users\' needs and experiences in mind.',
  },
  {
    title: 'Quality Excellence',
    description: 'We maintain the highest standards in everything we build and deliver.',
  },
  {
    title: 'Community Driven',
    description: 'Our community shapes our direction and drives our continuous improvement.',
  },
];

const LearnMore = React.memo(() => {
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
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 mb-8"
              animate={{ 
                y: [0, -8, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <BookOpen className="w-10 h-10 text-emerald-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-slate-800 dark:text-white">About </span>
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
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
              Discover our comprehensive resources and learn what Snowman can do for you.
            </motion.p>
          </motion.div>

          {/* About Sections */}
          <section className="mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              {aboutSections.map((section, index) => (
                <ShineEffect key={section.title} className="h-full">
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
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                    
                    <motion.div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${section.gradient} flex items-center justify-center mb-5 shadow-lg`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <section.icon className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                      {section.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {section.description}
                    </p>
                  </motion.div>
                </ShineEffect>
              ))}
            </div>
          </section>

          {/* Mission Statement */}
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
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-500 to-emerald-500 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Heart className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4">
                    Our Mission
                  </h2>
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    To empower every individual with the tools and platform they need to transform their creative visions into reality. 
                    We believe that creativity should know no bounds, and technology should serve as a bridge, not a barrier, 
                    to bringing ideas to life.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* Values Grid */}
          <section className="mb-20">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">
                Our{' '}
                <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">
                  values
                </span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                The principles that guide everything we do.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Copyright & Usage */}
          <section>
            <motion.div
              className="relative group max-w-4xl mx-auto"
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
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-slate-500 to-slate-600 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
                
                <div className="relative z-10 text-center">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-slate-500 to-slate-600 mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Snowflake className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-6">
                    Platform Information
                  </h2>
                  
                  <div className="space-y-4 text-left max-w-2xl mx-auto">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Copyright & Usage</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        © 2024 Snowman. All rights reserved. Content created on our platform belongs to the respective creators. 
                        We provide the tools, you own your creations.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Platform Goals</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        Our goal is to become the world's most intuitive and powerful creative platform, 
                        enabling millions of users to bring their imagination to life through advanced AI-powered tools.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Long-term Vision</h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        We envision a future where creativity is limitless, where anyone can transform their ideas into 
                        stunning visual content, and where technology serves as a catalyst for human imagination.
                      </p>
                    </div>
                  </div>
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

LearnMore.displayName = 'LearnMore';

export default LearnMore;