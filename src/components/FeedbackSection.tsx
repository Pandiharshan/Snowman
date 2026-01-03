import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ShineEffect from './ShineEffect';
import { Send, MessageSquare, User, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const FeedbackSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('Thank you for your feedback!', {
      description: 'We appreciate you taking the time to share your thoughts.',
    });
    
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-sky-50/50 to-white dark:from-slate-800 dark:to-slate-900 transition-colors duration-700">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <MessageSquare className="w-4 h-4" />
            <span>We'd love to hear from you</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Share your{' '}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              feedback
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Your thoughts help us create better experiences for everyone.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="relative p-8 md:p-12 rounded-3xl bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 group transition-all duration-500"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          whileHover={{ 
            y: -8,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
          }}
        >
          {/* Color glow effect on hover - matching CTA cards */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-sky-500 to-blue-600 opacity-0 group-hover:opacity-15 transition-opacity duration-500" />
          
          {/* Content wrapper */}
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Name Field */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Name
              </label>
              <div className="relative">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'name' ? 'text-sky-500' : 'text-slate-800 dark:text-slate-300'}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your name"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/40 dark:bg-slate-700/50 border-2 border-slate-300/60 dark:border-slate-600/60 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-sky-400 dark:focus:border-sky-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-sky-500' : 'text-slate-800 dark:text-slate-300'}`} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/40 dark:bg-slate-700/50 border-2 border-slate-300/60 dark:border-slate-600/60 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-sky-400 dark:focus:border-sky-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                />
              </div>
            </motion.div>
            </div>

          {/* Message Field */}
          <motion.div
            className="relative mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-2">
              Message
            </label>
            <div className="relative">
              <MessageSquare className={`absolute left-4 top-4 w-5 h-5 transition-colors duration-300 ${focusedField === 'message' ? 'text-sky-500' : 'text-slate-800 dark:text-slate-300'}`} />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                placeholder="Share your thoughts, suggestions, or feedback..."
                required
                rows={5}
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/60 dark:bg-slate-700/50 border-2 border-slate-300/60 dark:border-slate-600/60 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:border-sky-400 dark:focus:border-sky-400 focus:outline-none transition-all duration-300 resize-none backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Submit Button */}
          <ShineEffect className="w-full">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold flex items-center justify-center gap-3 shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/30 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Feedback</span>
                </>
              )}
            </motion.button>
          </ShineEffect>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default FeedbackSection;
