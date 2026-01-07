import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, ThumbsUp, Share2, Plus, TrendingUp, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ShineEffect from '@/components/ShineEffect';

const discussionTopics = [
  {
    id: 1,
    title: 'Best practices for creative prompts',
    author: 'CreativeExplorer',
    replies: 24,
    likes: 156,
    timeAgo: '2 hours ago',
    category: 'Tips & Tricks',
    gradient: 'from-sky-400 to-blue-500',
  },
  {
    id: 2,
    title: 'Showcase: My latest AI-generated artwork',
    author: 'DigitalArtist',
    replies: 18,
    likes: 89,
    timeAgo: '4 hours ago',
    category: 'Showcase',
    gradient: 'from-violet-400 to-purple-500',
  },
  {
    id: 3,
    title: 'Feature request: Batch processing',
    author: 'ProductivityGuru',
    replies: 12,
    likes: 67,
    timeAgo: '6 hours ago',
    category: 'Feature Requests',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    id: 4,
    title: 'How to improve image quality?',
    author: 'NewCreator',
    replies: 31,
    likes: 203,
    timeAgo: '8 hours ago',
    category: 'Help & Support',
    gradient: 'from-rose-400 to-pink-500',
  },
];

const categories = [
  { name: 'General Discussion', count: 156, color: 'text-sky-500' },
  { name: 'Tips & Tricks', count: 89, color: 'text-emerald-500' },
  { name: 'Showcase', count: 234, color: 'text-violet-500' },
  { name: 'Feature Requests', count: 45, color: 'text-rose-500' },
  { name: 'Help & Support', count: 78, color: 'text-amber-500' },
];

const Community = React.memo(() => {
  const [selectedCategory, setSelectedCategory] = useState('All');

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
              <Users className="w-10 h-10 text-violet-500" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <span className="text-slate-800 dark:text-white">Join the </span>
              <span className="bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">
                Community
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              Connect with fellow creators, share ideas, and learn from the community of innovators.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* New Post Button */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <ShineEffect className="w-full">
                  <motion.button
                    className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-violet-500/25 hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <Plus className="w-5 h-5" />
                    New Post
                  </motion.button>
                </ShineEffect>
              </motion.div>

              {/* Categories */}
              <motion.div
                className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-colors duration-200 ${
                      selectedCategory === 'All'
                        ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    All Discussions
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-colors duration-200 flex items-center justify-between ${
                        selectedCategory === category.name
                          ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-sm ${category.color}`}>{category.count}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Discussion List */}
              <div className="space-y-4">
                {discussionTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    className="group relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  >
                    <motion.div
                      className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm dark:shadow-none hover:shadow-md transition-all duration-500 cursor-pointer"
                      whileHover={{ 
                        y: -4,
                        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
                        transition: { type: 'spring', stiffness: 400, damping: 25 }
                      }}
                    >
                      {/* Glow effect */}
                      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${topic.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${topic.gradient} text-white`}>
                                {topic.category}
                              </span>
                              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {topic.timeAgo}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                              {topic.title}
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              by {topic.author}
                            </p>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{topic.replies} replies</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{topic.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            <span>Share</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Load More */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <motion.button
                  className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300 flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="w-4 h-4" />
                  Load More Discussions
                </motion.button>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
});

Community.displayName = 'Community';

export default Community;