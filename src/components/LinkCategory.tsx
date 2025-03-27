import { motion } from 'framer-motion';
import LinkCard from './LinkCard';

interface Link {
  title: string;
  url: string;
  icon?: string;
}

interface LinkCategoryProps {
  title: string;
  links: Link[];
  delay?: number;
  isGtmCategory?: boolean;
}

const LinkCategory = ({ title, links, delay = 0, isGtmCategory = false }: LinkCategoryProps) => {
  return (
    <motion.div
      className={`mb-6 w-full ${isGtmCategory ? 'gtm-category' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
    >
      <motion.h3 
        className={`text-lg font-semibold mb-3 text-center ${isGtmCategory ? 'text-blue-300' : ''}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay * 0.1 + 0.2, duration: 0.5 }}
      >
        {title}
      </motion.h3>
      <div className="space-y-3">
        {links.map((link, index) => (
          <LinkCard
            key={index}
            title={link.title}
            url={link.url}
            icon={link.icon}
            delay={delay + index + 1}
            isGtmCard={isGtmCategory}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default LinkCategory; 