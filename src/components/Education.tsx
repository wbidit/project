import { motion } from 'framer-motion';

const educationData = [
  {
    year: 'Expected Graduation: May 2025',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'National Institute of Science and Technology',
    description: ''
  },
  {
    year: 'Diploma in ITESM',
    degree: 'Diploma in Information Technology Enabled Services & Management',
    institution: 'Aditya Institute of Technology, New Delhi',
    description: ''
  }
];

export default function Education() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-glow"
        animate={{
          textShadow: [
            "0 0 20px rgba(124, 58, 237, 0)",
            "0 0 20px rgba(124, 58, 237, 0.5)",
            "0 0 20px rgba(124, 58, 237, 0)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        Education
      </motion.h2>
      <div className="space-y-8">
        {educationData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px rgba(124, 58, 237, 0.3)"
            }}
            className="bg-dark-900/40 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-accent-primary hover:border-accent-secondary transition-all duration-300"
          >
            <motion.span 
              className="text-xl font-bold text-accent-primary"
              whileHover={{
                textShadow: "0 0 12px rgba(124, 58, 237, 0.7)"
              }}
            >
              {item.year}
            </motion.span>
            <motion.h3 
              className="text-lg font-semibold mt-2 text-dark-100 hover:text-accent-secondary transition"
            >
              {item.degree}
            </motion.h3>
            <p className="text-dark-300 mt-1">{item.institution}</p>
            {item.description && <p className="text-dark-400 mt-2">{item.description}</p>}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
