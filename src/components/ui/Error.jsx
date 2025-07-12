import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Error = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while processing your request. Please try again.", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="text-center max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <ApperIcon name="AlertTriangle" className="h-8 w-8 text-red-600" />
          </motion.div>
          
          <h3 className="text-xl font-display font-semibold text-secondary-500 mb-2">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {message}
          </p>
          
          {showRetry && onRetry && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button onClick={onRetry} className="w-full">
                <ApperIcon name="RefreshCw" className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default Error;