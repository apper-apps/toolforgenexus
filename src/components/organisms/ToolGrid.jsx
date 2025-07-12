import React from "react";
import { motion } from "framer-motion";
import ToolCard from "@/components/molecules/ToolCard";
import Empty from "@/components/ui/Empty";
import { cn } from "@/utils/cn";

const ToolGrid = ({ tools, title, className }) => {
  if (!tools || tools.length === 0) {
    return (
      <Empty 
        title="No tools found" 
        description="Try adjusting your search or browse all available tools."
        actionText="View All Tools"
        actionLink="/all-tools"
      />
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {title && (
        <h2 className="text-2xl font-display font-bold text-secondary-500">
          {title}
        </h2>
      )}
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {tools.map((tool) => (
          <motion.div key={tool.id} variants={itemVariants}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ToolGrid;