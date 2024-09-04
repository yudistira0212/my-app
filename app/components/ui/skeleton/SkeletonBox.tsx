import React from "react";

const SkeletonBox = () => {
  return (
    <div
      role="status"
      className="w-full divide-gray-200 h-full rounded-3xl shadow animate-pulse dark:divide-gray-700  dark:border-gray-700"
    >
      <div className="flex items-center rounded-3xl justify-between h-full w-full bg-gray-700 "></div>
    </div>
  );
};

export default SkeletonBox;
