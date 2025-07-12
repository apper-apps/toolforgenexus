import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ToolGrid from "@/components/organisms/ToolGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTools } from "@/hooks/useTools";
import { cn } from "@/utils/cn";

const AllTools = ({ searchQuery }) => {
  const { tools, loading, error, loadTools, searchTools } = useTools();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Tools", icon: "Grid3X3" },
    { id: "image", name: "Image", icon: "Image" },
    { id: "pdf", name: "PDF", icon: "FileText" },
    { id: "text", name: "Text", icon: "Type" },
    { id: "converter", name: "Converter", icon: "RefreshCw" }
  ];

  useEffect(() => {
    if (searchQuery) {
      searchTools(searchQuery);
      setSelectedCategory("all");
    } else {
      loadTools();
    }
  }, [searchQuery]);

  const filteredTools = searchQuery 
    ? tools 
    : selectedCategory === "all" 
      ? tools 
      : tools.filter(tool => tool.category === selectedCategory);

  if (loading) return <Loading type="tools" />;
  if (error) return <Error message={error} onRetry={loadTools} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Grid3X3" className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-secondary-500 mb-4">
          All Tools
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Browse our complete collection of file processing tools. 
          Find the perfect tool for any task with our comprehensive toolkit.
        </p>
      </motion.div>

      {/* Category Filter */}
      {!searchQuery && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center"
        >
          {categories.map((category) => {
            const count = category.id === "all" 
              ? tools.length 
              : tools.filter(tool => tool.category === category.id).length;

            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "primary" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "flex items-center space-x-2",
                  selectedCategory === category.id && "shadow-glow"
                )}
              >
                <ApperIcon name={category.icon} className="h-4 w-4" />
                <span>{category.name}</span>
                <Badge 
                  variant={selectedCategory === category.id ? "default" : "primary"}
                  className="ml-1"
                >
                  {count}
                </Badge>
              </Button>
            );
          })}
        </motion.div>
      )}

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: searchQuery ? 0.2 : 0.4 }}
      >
        <ToolGrid 
          tools={filteredTools} 
          title={
            searchQuery 
              ? `Search Results (${filteredTools.length})`
              : `${categories.find(c => c.id === selectedCategory)?.name} (${filteredTools.length})`
          }
        />
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-display font-bold text-secondary-500 mb-6 text-center">
          Platform Statistics
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: "Grid3X3",
              label: "Total Tools",
              value: tools.length,
              color: "from-primary-500 to-primary-600"
            },
            {
              icon: "Star",
              label: "Popular Tools",
              value: tools.filter(tool => tool.popular).length,
              color: "from-accent-500 to-accent-600"
            },
            {
              icon: "Image",
              label: "Image Tools",
              value: tools.filter(tool => tool.category === "image").length,
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: "FileText",
              label: "PDF Tools",
              value: tools.filter(tool => tool.category === "pdf").length,
              color: "from-red-500 to-pink-500"
            }
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <ApperIcon name={stat.icon} className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-display font-bold text-secondary-500 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AllTools;