import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const FileDropZone = ({ 
  onFilesSelected, 
  acceptedTypes = "*", 
  maxFiles = 1, 
  maxSize = 10 * 1024 * 1024, // 10MB
  className 
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  }, []);

const processFiles = async (files) => {
    setIsProcessing(true);
    
    try {
      // Filter files based on type and size with better validation
      const validFiles = files.filter(file => {
        if (file.size > maxSize) {
          console.warn(`File ${file.name} exceeds size limit of ${formatFileSize(maxSize)}`);
          return false;
        }
        if (acceptedTypes !== "*") {
          const types = acceptedTypes.split(",").map(t => t.trim().toLowerCase());
          const fileType = file.type.toLowerCase();
          const fileExtension = file.name.split('.').pop()?.toLowerCase();
          
          const isValidType = types.some(type => 
            fileType.includes(type) || 
            fileExtension === type ||
            type.includes(fileExtension)
          );
          
          if (!isValidType) {
            console.warn(`File ${file.name} type not supported`);
            return false;
          }
        }
        return true;
      });

      // Limit number of files
      const selectedFiles = validFiles.slice(0, maxFiles);
      
      // Process files efficiently without unnecessary ArrayBuffer conversion
      const processedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          // Only convert to ArrayBuffer when actually needed for processing
          // For most cases, keep the File object which is more efficient
          const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
          
          return {
            id: Date.now() + Math.random(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file, // Keep original File object
            data: null, // Lazy load ArrayBuffer only when needed
            preview,
            status: "ready"
          };
        })
      );

      setIsProcessing(false);
      onFilesSelected(processedFiles);
      
    } catch (error) {
      setIsProcessing(false);
      console.error("File processing failed:", error);
      // Here you would typically show a toast notification
      // toast.error("Failed to process files. Please try again.");
    }
  };

  // Helper function to convert File to ArrayBuffer when needed
  const getFileData = async (processedFile) => {
    if (processedFile.data) {
      return processedFile.data;
    }
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(processedFile.file);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      <motion.div
        className={cn(
          "file-drop-zone relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
          isDragOver && "dragover",
          isProcessing && "pointer-events-none opacity-75"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <input
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
        />
        
        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="processing-pulse"
            >
              <ApperIcon name="Loader2" className="h-12 w-12 text-primary-500 mx-auto mb-4 animate-spin" />
              <p className="text-lg font-medium text-secondary-500 mb-2">Processing files...</p>
              <p className="text-gray-600">Please wait while we prepare your files</p>
            </motion.div>
          ) : (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <motion.div
                animate={isDragOver ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ApperIcon name="Upload" className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              </motion.div>
              
              <h3 className="text-lg font-semibold text-secondary-500 mb-2">
                Drop files here or click to browse
              </h3>
              
              <p className="text-gray-600 mb-4">
                {acceptedTypes === "*" ? "Any file type" : `Accepts: ${acceptedTypes}`}
                {maxFiles > 1 && ` • Up to ${maxFiles} files`}
                {` • Max size: ${formatFileSize(maxSize)}`}
              </p>
              
              <Button variant="outline" size="sm">
                <ApperIcon name="FolderOpen" className="h-4 w-4 mr-2" />
                Choose Files
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FileDropZone;