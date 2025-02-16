import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 100);
    });
  }, [scrollY]);

  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.nav
      style={{ opacity: navOpacity }}
      className="fixed w-full z-50 px-6 py-4 font-gladiola"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-dark-800/30 rounded-md shadow-lg px-6 py-4 border border-dark-700">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text"
            >
              Bidit Raj
            </motion.div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Education', 'Contact'].map((item) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  whileHover={{ scale: 1.1 }}
                  className="text-dark-200 hover:text-accent-secondary transition-colors"
                >
                  {item}
                </motion.a>
              ))}
            </div>

            <button
              className="md:hidden text-dark-200"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 space-y-4"
            >
              {['Home', 'About', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-dark-200 hover:text-accent-secondary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}