import React, { useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ToolGrid from "@/components/organisms/ToolGrid";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { useTools } from "@/hooks/useTools";

const PDFTools = ({ searchQuery }) => {
  const { tools, loading, error, getToolsByCategory, searchTools } = useTools();

  useEffect(() => {
    if (searchQuery) {
      searchTools(searchQuery);
    } else {
      getToolsByCategory("pdf");
    }
  }, [searchQuery]);

  if (loading) return <Loading type="tools" />;
  if (error) return <Error message={error} onRetry={() => getToolsByCategory("pdf")} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <ApperIcon name="FileText" className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-secondary-500 mb-4">
          PDF Tools
        </h1>
        
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Merge, split, and convert PDF documents with ease. Handle all your PDF needs 
          with professional tools that work entirely in your browser.
        </p>
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ToolGrid 
          tools={searchQuery ? tools : tools.filter(tool => tool.category === "pdf")} 
          title={searchQuery ? `Search Results (${tools.length})` : `Available Tools (${tools.filter(tool => tool.category === "pdf").length})`}
        />
      </motion.div>

      {/* PDF Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-display font-bold text-secondary-500 mb-6 text-center">
          PDF Management Guide
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: "FileePlus",
              title: "Merging PDFs",
              tip: "Combine multiple documents in any order. Perfect for consolidating reports or presentations."
            },
            {
              icon: "Scissors",
              title: "Splitting Documents",
              tip: "Extract specific pages or split large PDFs into smaller, manageable files."
            },
            {
              icon: "Image",
              title: "PDF to Images",
              tip: "Convert PDF pages to high-quality images for presentations or web use."
            },
            {
              icon: "Shield",
              title: "Privacy & Security",
              tip: "All PDF processing happens locally. Your documents never leave your device."
            }
          ].map((tip, index) => (
            <div key={tip.title} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
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

export default PDFTools;