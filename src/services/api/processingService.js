class ProcessingService {
  async compressImage(file, quality = 0.8) {
    await this.delay(1000);
    
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
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
      };
      
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(new Blob([file.data]));
    });
  }

  async convertImageFormat(file, targetFormat) {
    await this.delay(800);
    
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
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
      };
      
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = URL.createObjectURL(new Blob([file.data]));
    });
  }

  async mergePDFs(files) {
    await this.delay(2000);
    
    // Simulate PDF merging by combining file data
    const mergedData = new Uint8Array(
      files.reduce((acc, file) => acc + file.data.byteLength, 0)
    );
    
    let offset = 0;
    files.forEach(file => {
      mergedData.set(new Uint8Array(file.data), offset);
      offset += file.data.byteLength;
    });

    return {
      name: "merged_document.pdf",
      data: mergedData.buffer,
      size: mergedData.byteLength,
      type: "application/pdf"
    };
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
    await this.delay(500);
    
    if (isFile) {
      const base64 = btoa(String.fromCharCode(...new Uint8Array(input.data)));
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
  }

  async decodeBase64(base64String) {
    await this.delay(500);
    
    try {
      const decoded = atob(base64String);
      return {
        name: "decoded.txt",
        data: decoded,
        size: decoded.length,
        type: "text/plain"
      };
    } catch (error) {
      throw new Error("Invalid Base64 string");
    }
  }

  async delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new ProcessingService();