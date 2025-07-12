class ProcessingService {
  async compressImage(file, quality = 0.8) {
    // Reduced delay for better performance
    await this.delay(200);
    
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      // Set timeout to prevent hanging
      const timeout = setTimeout(() => {
        reject(new Error("Image processing timeout"));
      }, 30000);
      
      img.onload = () => {
        try {
          clearTimeout(timeout);
          
          // Optimize canvas size for large images
          const maxDimension = 4096;
          let { width, height } = img;
          
          if (width > maxDimension || height > maxDimension) {
            const ratio = Math.min(maxDimension / width, maxDimension / height);
            width *= ratio;
            height *= ratio;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Use better image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  name: `compressed_${file.name}`,
                  data: blob,
                  size: blob.size,
                  type: blob.type
                });
              } else {
                reject(new Error("Compression failed"));
              }
            },
            file.type,
            quality
          );
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("Failed to load image"));
      };
      
      // Create blob URL more efficiently
      const blob = file.data instanceof ArrayBuffer ? new Blob([file.data]) : file.data;
      img.src = URL.createObjectURL(blob);
    });
  }

async convertImageFormat(file, targetFormat) {
    // Reduced delay for better performance
    await this.delay(150);
    
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      const timeout = setTimeout(() => {
        reject(new Error("Image conversion timeout"));
      }, 30000);
      
      img.onload = () => {
        try {
          clearTimeout(timeout);
          
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Optimize rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0);
          
          const mimeType = `image/${targetFormat}`;
          const fileName = file.name.replace(/\.[^/.]+$/, `.${targetFormat}`);
          
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  name: fileName,
                  data: blob,
                  size: blob.size,
                  type: mimeType
                });
              } else {
                reject(new Error("Conversion failed"));
              }
            },
            mimeType,
            0.9
          );
        } catch (error) {
          clearTimeout(timeout);
          reject(error);
        }
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error("Failed to load image"));
      };
      
      const blob = file.data instanceof ArrayBuffer ? new Blob([file.data]) : file.data;
      img.src = URL.createObjectURL(blob);
    });
  }

async mergePDFs(files) {
    // Reduced delay for better performance
    await this.delay(500);
    
    try {
      // Optimize memory usage for large files
      const totalSize = files.reduce((acc, file) => acc + file.data.byteLength, 0);
      
      if (totalSize > 50 * 1024 * 1024) { // 50MB limit
        throw new Error("Combined PDF files too large");
      }
      
      // More efficient merging
      const mergedData = new Uint8Array(totalSize);
      
      let offset = 0;
      files.forEach(file => {
        const fileData = new Uint8Array(file.data);
        mergedData.set(fileData, offset);
        offset += fileData.byteLength;
      });

      return {
        name: "merged_document.pdf",
        data: mergedData.buffer,
        size: mergedData.byteLength,
        type: "application/pdf"
      };
    } catch (error) {
      throw new Error(`PDF merge failed: ${error.message}`);
    }
  }

  async splitPDF(file, pageRanges) {
    await this.delay(1500);
    
    // Simulate PDF splitting by creating multiple outputs
    const results = pageRanges.map((range, index) => ({
      name: `split_${index + 1}_${file.name}`,
      data: file.data, // In reality, this would be the actual split data
      size: Math.floor(file.size / pageRanges.length),
      type: "application/pdf"
    }));

    return results;
  }

async encodeBase64(input, isFile = false) {
    // Minimal delay for text operations
    await this.delay(50);
    
    try {
      if (isFile) {
        // More efficient base64 encoding for large files
        const uint8Array = new Uint8Array(input.data);
        const chunkSize = 8192;
        let base64 = '';
        
        for (let i = 0; i < uint8Array.length; i += chunkSize) {
          const chunk = uint8Array.slice(i, i + chunkSize);
          base64 += btoa(String.fromCharCode(...chunk));
        }
        
        return {
          name: `${input.name}.txt`,
          data: base64,
          size: base64.length,
          type: "text/plain"
        };
      } else {
        const base64 = btoa(input);
        return {
          name: "encoded.txt",
          data: base64,
          size: base64.length,
          type: "text/plain"
        };
      }
    } catch (error) {
      throw new Error(`Base64 encoding failed: ${error.message}`);
    }
  }

async decodeBase64(base64String) {
    // Minimal delay for decode operations
    await this.delay(25);
    
    try {
      const decoded = atob(base64String);
      return {
        name: "decoded.txt",
        data: decoded,
        size: decoded.length,
        type: "text/plain"
      };
    } catch (error) {
      throw new Error(`Base64 decoding failed: ${error.message}`);
    }
  }

async delay(ms) {
    // Only delay if ms > 0 for better performance testing
    return ms > 0 ? new Promise(resolve => setTimeout(resolve, ms)) : Promise.resolve();
  }
}

export default new ProcessingService();