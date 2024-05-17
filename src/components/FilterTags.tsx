import React, { useState } from "react";

const FilterTags = ({ filters, selectedFilters, onFilterChange }) => {
  const handleFilterChange = (filter) => {
    const updatedFilters = [...selectedFilters];
    const index = updatedFilters.indexOf(filter);
    if (index === -1) {
      updatedFilters.push(filter);
    } else {
      updatedFilters.splice(index, 1);
    }
    onFilterChange(updatedFilters);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`border border-gray-300 rounded-md px-3 py-1 ${
            selectedFilters.includes(filter) ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => handleFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterTags;
