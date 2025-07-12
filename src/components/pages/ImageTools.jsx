import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ToolGrid from "@/components/organisms/ToolGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTools } from "@/hooks/useTools";

const ImageTools = ({ searchQuery }) => {
  const { tools, loading, error, getToolsByCategory, searchTools } = useTools();

  useEffect(() => {
    if (searchQuery) {
      searchTools(searchQuery);
    } else {
      getToolsByCategory("image");
    }
  }, [searchQuery]);

  if (loading) return <Loading type="tools" />;
  if (error) return <Error message={error} onRetry={() => getToolsByCategory("image")} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Image" className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-secondary-500 mb-4">
          Image Tools
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Optimize, convert, and transform your images with professional-grade tools. 
          All processing happens locally in your browser for maximum privacy and speed.
        </p>
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ToolGrid 
          tools={searchQuery ? tools : tools.filter(tool => tool.category === "image")} 
          title={searchQuery ? `Search Results (${tools.length})` : `Available Tools (${tools.filter(tool => tool.category === "image").length})`}
        />
      </motion.div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-display font-bold text-secondary-500 mb-6 text-center">
          Image Optimization Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "Minimize2",
              title: "Compression Best Practices",
              tip: "Use 80-90% quality for photos and 100% for graphics with text or sharp edges."
            },
            {
              icon: "Monitor",
              title: "Web Optimization",
              tip: "WebP format offers 25-30% better compression than JPG while maintaining quality."
            },
            {
              icon: "Smartphone",
              title: "Mobile Friendly",
              tip: "Keep images under 1MB for fast mobile loading. Consider responsive image sizes."
            },
            {
              icon: "Eye",
              title: "Quality Balance",
              tip: "Always preview compressed images to ensure quality meets your requirements."
            }
          ].map((tip, index) => (
            <div key={tip.title} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <ApperIcon name={tip.icon} className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-secondary-500 mb-1">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageTools;