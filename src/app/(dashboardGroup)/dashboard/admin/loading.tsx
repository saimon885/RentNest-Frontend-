import RentNestLoader from "@/components/home/Loader";
import React from "react";

const loading = () => {
  return (
    <div>
      <RentNestLoader label="Loading admin dashboard..." />
    </div>
  );
};

export default loading;
