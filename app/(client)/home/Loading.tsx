import Loading from "@/app/components/common/loading/Loading";
import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loading text="Loading..." />
    </div>
  );
};

export default loading;
