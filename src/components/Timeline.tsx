import { motion } from 'framer-motion';

const timelineData = [
  {
    year: '2023',
    title: 'UI/UX Designer & Frontend Developer',
    description: 'Leading design and development projects, creating intuitive user interfaces.'
  },
  {
    year: '2022',
    title: 'Frontend Developer',
    description: 'Specialized in React and modern frontend technologies.'
  },
  {
    year: '2021',
    title: 'UI/UX Design Intern',
    description: 'Started journey in design, learning principles and best practices.'
  }
];

export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto py-16">
      <h2 className="text-3xl font-bold text-center mb-12 text-dark-50">My Journey</h2>
      <div className="relative">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center mb-8`}
          >
            <div className="w-1/2 px-4">
              <motion.div 
                className="bg-dark-800/30 backdrop-blur-md p-6 rounded-md shadow-lg border border-dark-700 hover:border-accent-primary/50 transition-colors duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(124, 58, 237, 0.2)"
                }}
              >
                <motion.span 
                  className="text-xl font-bold text-accent-primary"
                  whileHover={{
                    textShadow: "0 0 8px rgba(124, 58, 237, 0.5)"
                  }}
                >
                  {item.year}
                </motion.span>
                <h3 className="text-lg font-semibold mt-2 text-dark-100">{item.title}</h3>
                <p className="text-dark-300 mt-2">{item.description}</p>
              </motion.div>
            </div>
            <motion.div 
              className="w-4 h-4 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full absolute left-1/2 transform -translate-x-1/2"
              whileHover={{
                scale: 1.5,
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)"
              }}
            />
          </motion.div>
        ))}
        <div className="absolute h-full w-1 bg-gradient-to-b from-accent-primary to-accent-secondary left-1/2 transform -translate-x-1/2 -z-10" />
      </div>
    </div>
  );
}