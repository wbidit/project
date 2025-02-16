import { motion } from 'framer-motion';

const educationData = [
  {
    year: '2020 - 2024',
    degree: 'Bachelor of Technology in Computer Science',
    institution: 'Silicon Institute of Technology, Bhubaneswar',
    description: 'Specializing in software development and UI/UX design'
  },
  {
    year: '2018 - 2020',
    degree: 'Higher Secondary Education',
    institution: 'DAV Public School, Bhubaneswar',
    description: 'Science stream with Computer Science'
  }
];

export default function Education() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <motion.h2 
        className="text-3xl font-bold text-center mb-12 text-dark-50"
        animate={{
          textShadow: [
            "0 0 20px rgba(124, 58, 237, 0)",
            "0 0 20px rgba(124, 58, 237, 0.3)",
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
              scale: 1.02,
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.2)"
            }}
            className="bg-dark-800/30 backdrop-blur-md p-6 rounded-md shadow-lg border border-dark-700 hover:border-accent-primary/50 transition-all duration-300"
          >
            <motion.span 
              className="text-xl font-bold text-accent-primary"
              whileHover={{
                textShadow: "0 0 8px rgba(124, 58, 237, 0.5)"
              }}
            >
              {item.year}
            </motion.span>
            <motion.h3 
              className="text-lg font-semibold mt-2 text-dark-100"
              whileHover={{
                color: "#7C3AED",
                transition: { duration: 0.2 }
              }}
            >
              {item.degree}
            </motion.h3>
            <p className="text-dark-200 mt-1">{item.institution}</p>
            <p className="text-dark-300 mt-2">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}