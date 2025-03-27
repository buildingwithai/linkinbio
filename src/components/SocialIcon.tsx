import { motion } from 'framer-motion';

interface SocialIconProps {
  icon: React.ReactNode;
  url: string;
  delay?: number;
}

const SocialIcon = ({ icon, url, delay = 0 }: SocialIconProps) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block p-2 glassmorphic rounded-full mx-2"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        delay: delay * 0.1, 
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  );
};

export default SocialIcon; 