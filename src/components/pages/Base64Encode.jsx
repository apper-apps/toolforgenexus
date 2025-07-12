import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import FileDropZone from "@/components/molecules/FileDropZone";
import processingService from "@/services/api/processingService";
import { cn } from "@/utils/cn";

const Base64Encode = () => {
  const [mode, setMode] = useState("text"); // "text" or "file"
  const [textInput, setTextInput] = useState("");
  const [files, setFiles] = useState([]);
  const [result, setResult] = useState("");
  const [processing, setProcessing] = useState(false);

  const tool = {
    id: "base64-encode",
    name: "Base64 Encoder",
    description: "Encode text or files to Base64 format",
    icon: "Lock"
  };

  const handleTextEncode = async () => {
    if (!textInput.trim()) {
      toast.error("Please enter some text to encode");
      return;
    }

    setProcessing(true);
    try {
      const encoded = await processingService.encodeBase64(textInput);
      setResult(encoded.data);
      toast.success("Text encoded successfully");
    } catch (error) {
      toast.error("Failed to encode text: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleFileEncode = async () => {
    if (!files.length) {
      toast.error("Please select a file to encode");
      return;
    }

    setProcessing(true);
    try {
      const encoded = await processingService.encodeBase64(files[0], true);
      setResult(encoded.data);
      toast.success("File encoded successfully");
    } catch (error) {
      toast.error("Failed to encode file: " + error.message);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "encoded_base64.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleReset = () => {
    setTextInput("");
    setFiles([]);
    setResult("");
  };

  return (
    <div className="space-y-6">
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
          {/* Mode Selection */}
          <Card>
            <h2 className="text-lg font-semibold text-secondary-500 mb-4">
              Choose Input Type
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "text", name: "Text", icon: "Type" },
                { id: "file", name: "File", icon: "File" }
              ].map((modeOption) => (
                <button
                  key={modeOption.id}
                  onClick={() => setMode(modeOption.id)}
                  className={cn(
                    "p-4 text-center border rounded-lg transition-all duration-200 hover:shadow-medium",
                    mode === modeOption.id
                      ? "border-primary-500 bg-primary-50 shadow-soft"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  )}
                >
                  <ApperIcon name={modeOption.icon} className="h-6 w-6 mx-auto mb-2 text-primary-500" />
                  <div className="font-medium text-secondary-500">
                    {modeOption.name}
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Text Input */}
          {mode === "text" && (
            <Card>
              <h3 className="text-lg font-semibold text-secondary-500 mb-4">
                Enter Text
              </h3>
              <FormField label="Text to encode">
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter your text here..."
                  className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </FormField>
              <Button 
                onClick={handleTextEncode} 
                disabled={processing || !textInput.trim()}
                className="w-full mt-4"
              >
                {processing ? (
                  <>
                    <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                    Encoding...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Lock" className="h-4 w-4 mr-2" />
                    Encode Text
                  </>
                )}
              </Button>
            </Card>
          )}

          {/* File Input */}
          {mode === "file" && (
            <Card>
              <h3 className="text-lg font-semibold text-secondary-500 mb-4">
                Upload File
              </h3>
              <FileDropZone
                onFilesSelected={setFiles}
                acceptedTypes="*"
                maxFiles={1}
                maxSize={5 * 1024 * 1024} // 5MB
              />
              {files.length > 0 && (
                <Button 
                  onClick={handleFileEncode} 
                  disabled={processing}
                  className="w-full mt-4"
                >
                  {processing ? (
                    <>
                      <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                      Encoding...
                    </>
                  ) : (
                    <>
                      <ApperIcon name="Lock" className="h-4 w-4 mr-2" />
                      Encode File
                    </>
                  )}
                </Button>
              )}
            </Card>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-6">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-secondary-500">
                    Encoded Result
                  </h3>
                  <Button variant="outline" size="sm" onClick={handleReset}>
                    <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <textarea
                    value={result}
                    readOnly
                    className="w-full h-32 bg-transparent border-none resize-none focus:outline-none text-sm font-mono"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button onClick={handleCopy} className="flex-1">
                    <ApperIcon name="Copy" className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" onClick={handleDownload} className="flex-1">
                    <ApperIcon name="Download" className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-semibold text-secondary-500 mb-3">
              About Base64 Encoding
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Base64 encoding converts binary data to ASCII text format</p>
              <p>• Commonly used for embedding images in HTML/CSS</p>
              <p>• Safe for transmission over text-based protocols</p>
              <p>• Output is approximately 33% larger than input</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Base64Encode;