import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="text-center relative font-gladiola">
      <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 blur-[120px] -z-10" />
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        <motion.span
          animate={{ 
            textShadow: [
              "0 0 20px rgba(44, 62, 80, 0)",
              "0 0 20px rgba(44, 62, 80, 0.3)",
              "0 0 20px rgba(44, 62, 80, 0)"
            ]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="bg-gradient-to-r from-accent-primary to-accent-secondary text-transparent bg-clip-text"
        >
          Bidit Raj
        </motion.span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <motion.p 
          className="text-xl md:text-2xl text-dark-300 mb-8"
          animate={{ 
            color: ["#b6b8c2", "#d8d9df", "#b6b8c2"]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          UI/UX Designer & Frontend Developer
        </motion.p>
      </motion.div>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        href="#contact"
        className="relative inline-block px-8 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-50 rounded-md font-medium group overflow-hidden"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">Get in Touch</span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-accent-secondary to-accent-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.a>
    </div>
  );
}