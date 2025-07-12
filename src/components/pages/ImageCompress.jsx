import React, { useState } from "react";
import { toast } from "react-toastify";
import ToolWorkspace from "@/components/organisms/ToolWorkspace";
import FormField from "@/components/molecules/FormField";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import processingService from "@/services/api/processingService";

const ImageCompress = () => {
  const [quality, setQuality] = useState(80);

  const tool = {
    id: "image-compress",
    name: "Image Compressor",
    description: "Reduce file size while maintaining quality",
    icon: "Minimize2"
  };

  const handleProcessFiles = async (files) => {
    try {
      const results = await Promise.all(
        files.map(file => processingService.compressImage(file, quality / 100))
      );
      
      toast.success(`Successfully compressed ${results.length} image(s)`);
      return results;
    } catch (error) {
      toast.error("Failed to compress images: " + error.message);
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
        <FormField label="Quality Level">
          <div className="space-y-3">
            <Input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>10% (Smallest)</span>
              <span className="font-medium">{quality}%</span>
              <span>100% (Best Quality)</span>
            </div>
          </div>
        </FormField>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Quality levels of 80-90% provide the best balance 
            between file size and visual quality for most images.
          </p>
        </div>
      </div>
    </ToolWorkspace>
  );
};

export default ImageCompress;