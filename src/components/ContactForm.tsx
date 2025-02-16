import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <section id="contact" className="py-16 bg-[#1a1a2e]">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-[#e6e6fa] mb-8 text-center">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-[#2a2a3e] text-[#e6e6fa] border border-[#4a90e2] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-[#2a2a3e] text-[#e6e6fa] border border-[#4a90e2] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              rows={6}
              className="w-full p-3 rounded-md bg-[#2a2a3e] text-[#e6e6fa] border border-[#4a90e2] focus:outline-none focus:ring-2 focus:ring-[#4a90e2]"
              required
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-6 bg-gradient-to-r from-[#4a90e2] to-[#63b3ed] text-white rounded-md font-medium"
            type="submit"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}
