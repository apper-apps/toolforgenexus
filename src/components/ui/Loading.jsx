import React from "react";
import { motion } from "framer-motion";

const Loading = ({ type = "tools" }) => {
  const SkeletonCard = () => (
    <div className="bg-white rounded-xl p-6 shadow-medium">
      <div className="shimmer bg-gray-200 h-32 rounded-lg mb-4" />
      <div className="space-y-3">
        <div className="shimmer bg-gray-200 h-6 rounded w-3/4" />
        <div className="shimmer bg-gray-200 h-4 rounded w-full" />
        <div className="shimmer bg-gray-200 h-4 rounded w-2/3" />
        <div className="flex justify-between items-center pt-2">
          <div className="shimmer bg-gray-200 h-6 rounded-full w-20" />
          <div className="shimmer bg-gray-200 h-4 w-4 rounded" />
        </div>
      </div>
    </div>
  );

  const SkeletonHeader = () => (
    <div className="bg-white rounded-xl p-6 shadow-medium mb-6">
      <div className="flex items-center space-x-4">
        <div className="shimmer bg-gray-200 w-12 h-12 rounded-lg" />
        <div className="flex-1">
          <div className="shimmer bg-gray-200 h-8 rounded w-1/3 mb-2" />
          <div className="shimmer bg-gray-200 h-4 rounded w-2/3" />
        </div>
      </div>
    </div>
  );

  if (type === "tools") {
    return (
      <div className="space-y-6">
        <div className="shimmer bg-gray-200 h-8 rounded w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (type === "workspace") {
    return (
      <div className="space-y-6">
        <SkeletonHeader />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-medium">
              <div className="shimmer bg-gray-200 h-6 rounded w-32 mb-4" />
              <div className="shimmer bg-gray-200 h-40 rounded-xl" />
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-medium">
              <div className="shimmer bg-gray-200 h-6 rounded w-24 mb-4" />
              <div className="shimmer bg-gray-200 h-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default loading
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;