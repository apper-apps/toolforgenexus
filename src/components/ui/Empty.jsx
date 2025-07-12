import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const Empty = ({ 
  title = "No items found", 
  description = "It looks like there's nothing here yet.", 
  actionText = "Get Started",
  actionLink = "/",
  icon = "Search"
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
            className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <ApperIcon name={icon} className="h-10 w-10 text-primary-600" />
          </motion.div>
          
          <h3 className="text-xl font-display font-semibold text-secondary-500 mb-3">
            {title}
          </h3>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {description}
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button asChild className="w-full">
              <Link to={actionLink}>
                <ApperIcon name="ArrowRight" className="h-4 w-4 mr-2" />
                {actionText}
              </Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Empty;