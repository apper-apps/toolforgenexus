import React, { useState } from "react";
import { toast } from "react-toastify";
import ToolWorkspace from "@/components/organisms/ToolWorkspace";
import FormField from "@/components/molecules/FormField";
import Label from "@/components/atoms/Label";
import Button from "@/components/atoms/Button";
import processingService from "@/services/api/processingService";
import { cn } from "@/utils/cn";

const ImageConvert = () => {
  const [targetFormat, setTargetFormat] = useState("webp");

  const tool = {
    id: "image-convert",
    name: "Format Converter",
    description: "Convert between image formats",
    icon: "RefreshCw"
  };

  const formats = [
    { id: "webp", name: "WebP", description: "Modern format with excellent compression" },
    { id: "jpg", name: "JPG", description: "Best for photos and complex images" },
    { id: "png", name: "PNG", description: "Best for graphics with transparency" },
    { id: "bmp", name: "BMP", description: "Uncompressed bitmap format" }
  ];

  const handleProcessFiles = async (files) => {
    try {
      const results = await Promise.all(
        files.map(file => processingService.convertImageFormat(file, targetFormat))
      );
      
      toast.success(`Successfully converted ${results.length} image(s) to ${targetFormat.toUpperCase()}`);
      return results;
    } catch (error) {
      toast.error("Failed to convert images: " + error.message);
      throw error;
    }
  };

  return (
    <ToolWorkspace
      tool={tool}
      onProcessFiles={handleProcessFiles}
      acceptedTypes="image/*"
      maxFiles={10}
    >
      <div className="space-y-4">
        <FormField label="Target Format">
          <div className="grid grid-cols-2 gap-3">
            {formats.map((format) => (
              <button
                key={format.id}
                onClick={() => setTargetFormat(format.id)}
                className={cn(
                  "p-4 text-left border rounded-lg transition-all duration-200 hover:shadow-medium",
                  targetFormat === format.id
                    ? "border-primary-500 bg-primary-50 shadow-soft"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <div className="font-medium text-secondary-500 mb-1">
                  {format.name}
                </div>
                <div className="text-sm text-gray-600">
                  {format.description}
                </div>
              </button>
            ))}
          </div>
        </FormField>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            <strong>Recommendation:</strong> WebP offers the best compression while 
            maintaining quality. Use PNG for images requiring transparency.
          </p>
        </div>
      </div>
    </ToolWorkspace>
  );
};

export default ImageConvert;