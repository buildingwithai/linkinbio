import { motion } from 'framer-motion';

interface LinkCardProps {
  title: string;
  url: string;
  icon?: string;
  delay?: number;
  isGtmCard?: boolean;
}

const LinkCard = ({ title, url, icon, delay = 0, isGtmCard = false }: LinkCardProps) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-full block mb-3 glassmorphic rounded-xl p-4 text-center link-button ${isGtmCard ? 'gtm-card' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: delay * 0.1, 
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ 
        scale: 1.03,
        boxShadow: isGtmCard 
          ? "0 10px 25px rgba(0, 0, 0, 0.5), 0 0 15px rgba(100, 200, 255, 0.5)" 
          : "0 10px 25px rgba(0, 0, 0, 0.2)"
      }}
    >
      <div className="flex items-center justify-center space-x-2">
        {icon && (
          <span className="text-lg">{icon}</span>
        )}
        <span className={`font-medium ${isGtmCard ? 'text-blue-200' : ''}`}>{title}</span>
      </div>
    </motion.a>
  );
};

export default LinkCard; 