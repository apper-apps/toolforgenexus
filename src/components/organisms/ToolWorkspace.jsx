import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FileDropZone from "@/components/molecules/FileDropZone";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const ToolWorkspace = ({ 
  tool, 
  onProcessFiles, 
  acceptedTypes = "*",
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024,
  children,
  className 
}) => {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState([]);

  const handleFilesSelected = (selectedFiles) => {
    setFiles(selectedFiles);
    setResults([]);
  };

const handleProcess = async () => {
    if (!files.length) return;

    // Validate file sizes before processing
    const totalSize = files.reduce((acc, file) => acc + file.size, 0);
    const maxTotalSize = 100 * 1024 * 1024; // 100MB total limit
    
    if (totalSize > maxTotalSize) {
      console.error("Total file size exceeds limit");
      // toast.error("Total file size too large. Please reduce file sizes or number of files.");
      return;
    }

    setProcessing(true);
    setProgress(0);

    try {
      // Enhanced progress simulation with realistic timing
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += Math.random() * 15 + 5; // Variable progress increments
        if (currentProgress >= 85) {
          clearInterval(progressInterval);
          setProgress(85);
        } else {
          setProgress(currentProgress);
        }
      }, 150);

      // Prepare files with data when needed
      const filesWithData = await Promise.all(
        files.map(async (file) => {
          if (!file.data && file.file) {
            // Convert File to ArrayBuffer only when needed
            const arrayBuffer = await file.file.arrayBuffer();
            return { ...file, data: arrayBuffer };
          }
          return file;
        })
      );

      const processedResults = await onProcessFiles(filesWithData);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setTimeout(() => {
        setResults(Array.isArray(processedResults) ? processedResults : [processedResults]);
        setProcessing(false);
        setProgress(0);
        // toast.success(`Successfully processed ${files.length} file(s)`);
      }, 300);

    } catch (error) {
      setProcessing(false);
      setProgress(0);
      console.error("Processing failed:", error);
      // toast.error("Processing failed. Please try again.");
    }
  };

  const handleDownload = (result) => {
    const blob = new Blob([result.data], { type: result.type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
    setProcessing(false);
    setProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Tool Header */}
      <Card className="bg-gradient-to-r from-primary-50 to-primary-100 border-primary-200">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
            <ApperIcon name={tool.icon} className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-secondary-500">
              {tool.name}
            </h1>
            <p className="text-gray-600">{tool.description}</p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-secondary-500 mb-4">
              Upload Files
            </h2>
            <FileDropZone
              onFilesSelected={handleFilesSelected}
              acceptedTypes={acceptedTypes}
              maxFiles={maxFiles}
              maxSize={maxSize}
            />
          </Card>

          {/* Selected Files */}
          <AnimatePresence>
            {files.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-secondary-500 mb-4">
                    Selected Files ({files.length})
                  </h3>
                  <div className="space-y-3">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <ApperIcon name="File" className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setFiles(files.filter(f => f.id !== file.id))}
                        >
                          <ApperIcon name="X" className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tool Controls */}
          {children && files.length > 0 && (
            <Card>
              <h3 className="text-lg font-semibold text-secondary-500 mb-4">
                Options
              </h3>
              {children}
            </Card>
          )}

          {/* Process Button */}
          <AnimatePresence>
            {files.length > 0 && !processing && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Button
                  onClick={handleProcess}
                  className="w-full"
                  size="lg"
                >
                  <ApperIcon name="Play" className="h-5 w-5 mr-2" />
                  Process Files
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {/* Processing */}
          <AnimatePresence>
            {processing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <h3 className="text-lg font-semibold text-secondary-500 mb-4">
                    Processing...
                  </h3>
                  <ProgressBar
                    progress={progress}
                    label="Processing files"
                    showPercentage
                  />
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-secondary-500">
                      Results ({results.length})
                    </h3>
                    <Button variant="outline" size="sm" onClick={handleReset}>
                      <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {results.map((result, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center space-x-3">
                          <ApperIcon name="CheckCircle" className="h-5 w-5 text-green-500" />
                          <div>
                            <p className="font-medium text-sm">{result.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(result.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleDownload(result)}
                        >
                          <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ToolWorkspace;