import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

const ProgressBar = ({ 
  progress = 0, 
  showPercentage = true, 
  label = "", 
  className,
  size = "default" 
}) => {
  const sizes = {
    sm: "h-1",
    default: "h-2",
    lg: "h-3"
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-secondary-500">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          )}
        </div>
      )}
      
      <div className={cn("bg-gray-200 rounded-full overflow-hidden", sizes[size])}>
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-full h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;