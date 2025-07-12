import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ToolCard = ({ tool, className }) => {
  const getCategoryColor = (category) => {
    const colors = {
      image: "from-blue-500 to-cyan-500",
      pdf: "from-red-500 to-pink-500",
      text: "from-green-500 to-emerald-500",
      converter: "from-purple-500 to-indigo-500",
    };
    return colors[category] || "from-gray-500 to-slate-500";
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={tool.route}>
        <Card className={cn("group cursor-pointer hover:shadow-strong border-0 overflow-hidden", className)}>
          <div className={cn(
            "w-full h-32 rounded-lg mb-4 bg-gradient-to-br flex items-center justify-center",
            getCategoryColor(tool.category)
          )}>
            <ApperIcon 
              name={tool.icon} 
              className="h-12 w-12 text-white group-hover:scale-110 transition-transform duration-200" 
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-display font-semibold text-lg text-secondary-500 group-hover:text-primary-500 transition-colors">
                {tool.name}
              </h3>
              {tool.popular && (
                <Badge variant="accent" className="ml-2">
                  Popular
                </Badge>
              )}
            </div>
            
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {tool.description}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <Badge variant="primary" className="capitalize">
                {tool.category}
              </Badge>
              <ApperIcon 
                name="ArrowRight" 
                className="h-4 w-4 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ToolCard;