import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ToolGrid from "@/components/organisms/ToolGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTools } from "@/hooks/useTools";

const TextTools = ({ searchQuery }) => {
  const { tools, loading, error, getToolsByCategory, searchTools } = useTools();

  useEffect(() => {
    if (searchQuery) {
      searchTools(searchQuery);
    } else {
      getToolsByCategory("text");
    }
  }, [searchQuery]);

  if (loading) return <Loading type="tools" />;
  if (error) return <Error message={error} onRetry={() => getToolsByCategory("text")} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="Type" className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-secondary-500 mb-4">
          Text Tools
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Process, analyze, and transform text content with powerful tools. 
          From encoding to analysis, handle all your text processing needs efficiently.
        </p>
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ToolGrid 
          tools={searchQuery ? tools : tools.filter(tool => tool.category === "text")} 
          title={searchQuery ? `Search Results (${tools.length})` : `Available Tools (${tools.filter(tool => tool.category === "text").length})`}
        />
      </motion.div>

      {/* Text Processing Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-display font-bold text-secondary-500 mb-6 text-center">
          Text Processing Tips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "Lock",
              title: "Base64 Encoding",
              tip: "Perfect for embedding images in CSS/HTML or transmitting binary data as text."
            },
            {
              icon: "Hash",
              title: "Text Analysis",
              tip: "Count words, characters, and paragraphs to optimize content length and readability."
            },
            {
              icon: "Link",
              title: "URL Management",
              tip: "Shorten long URLs for social media sharing and tracking click-through rates."
            },
            {
              icon: "Type",
              title: "Format Conversion",
              tip: "Transform text between different formats and encodings for various applications."
            }
          ].map((tip, index) => (
            <div key={tip.title} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
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

export default TextTools;