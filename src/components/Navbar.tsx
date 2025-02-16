import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Navbar appearance animation based on scroll
  useEffect(() => {
    return scrollY.onChange((latest) => {
      if (latest > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, [scrollY]);

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const menuVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.nav
      className="fixed w-full z-50 px-6 py-4 font-gladiola"
      variants={navVariants}
      animate={scrolled ? 'visible' : 'hidden'}
      initial="hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-md bg-dark-800/30 rounded-md shadow-lg px-6 py-4 border border-dark-700 flex items-center justify-between">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            Bidit Raj
          </motion.div>

          <div className="hidden md:flex space-x-8">
            {['Home', 'About', 'Education', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-dark-200 hover:text-accent-secondary transition-colors"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-dark-200 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
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
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full bg-dark-900/50 backdrop-blur-md z-40 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="bg-dark-800 rounded-lg shadow-lg p-8 w-80 text-center"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {['Home', 'About', 'Education', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-dark-200 hover:text-accent-secondary py-2 transition-colors"
                onClick={() => setIsOpen(false)}
                variants={linkVariants}
                style={{ display: 'block' }} // Add display: 'block' to make the entire area clickable
                whileHover={{ scale: 1.1, originX: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  );
}
