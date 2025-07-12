import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "@/components/organisms/Header";
import Home from "@/components/pages/Home";
import ImageTools from "@/components/pages/ImageTools";
import PDFTools from "@/components/pages/PDFTools";
import TextTools from "@/components/pages/TextTools";
import AllTools from "@/components/pages/AllTools";
import ImageCompress from "@/components/pages/ImageCompress";
import ImageConvert from "@/components/pages/ImageConvert";
import Base64Encode from "@/components/pages/Base64Encode";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/image-tools" element={<ImageTools searchQuery={searchQuery} />} />
          <Route path="/pdf-tools" element={<PDFTools searchQuery={searchQuery} />} />
          <Route path="/text-tools" element={<TextTools searchQuery={searchQuery} />} />
          <Route path="/all-tools" element={<AllTools searchQuery={searchQuery} />} />
          
          {/* Tool Routes */}
          <Route path="/tools/image-compress" element={<ImageCompress />} />
          <Route path="/tools/image-convert" element={<ImageConvert />} />
          <Route path="/tools/base64-encode" element={<Base64Encode />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="font-body"
      />
    </div>
  );
}

export default App;