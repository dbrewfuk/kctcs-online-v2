import React from "react";

function CurrentFilters({
  areaFilterSelected,
  filtersApplied,
  setAreaFilter,
  setAreaFilterSelected,
  setSelectedArea,
  selectedArea,
  planFilterSelected,
  selectedPlan,
  setPlanFilter,
  setPlanFilterSelected,
  setCredentialFilter,
  credentialFilterSelected,
  setSelectedCredential,
  selectedCredential,
  setSearchQuery,
  searchQuery,
}) {
  return (
    <div className="container mx-auto">
      <div className="flex items-center gap-4">
        <span className="flex text-sm gap-2">
          {areaFilterSelected && filtersApplied && (
            <span
              onClick={() => {
                setAreaFilter("");
                setAreaFilterSelected(false);
                setSelectedArea("");
              }}
              className="bg-[#00467F] flex gap-[12px] items-center rounded-[6px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]"
            >
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                >
                  <path
                    d="M0.412305 0.5L0 0.912888L3.5874 4.50029L0 8.08769L0.412305 8.5L3.99971 4.9126L7.58769 8.5L8 8.08711L4.4126 4.49971L8 0.912305L7.58769 0.500583L4.00058 4.08799L0.412305 0.5Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <span>{selectedArea} </span>
            </span>
          )}
          {planFilterSelected && filtersApplied && selectedPlan && (
            <span
              onClick={() => {
                setPlanFilter("");
                setPlanFilterSelected(false);
                setSelectedPlan("");
                l;
              }}
              className="bg-[#00467F] flex gap-[8px] items-center rounded-[6px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]"
            >
              <button
                className=""
                onClick={() => {
                  setPlanFilter("");
                  setPlanFilterSelected(false);
                  setSelectedPlan("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                >
                  <path
                    d="M0.412305 0.5L0 0.912888L3.5874 4.50029L0 8.08769L0.412305 8.5L3.99971 4.9126L7.58769 8.5L8 8.08711L4.4126 4.49971L8 0.912305L7.58769 0.500583L4.00058 4.08799L0.412305 0.5Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <span>{selectedPlan}</span>
            </span>
          )}

          {credentialFilterSelected && filtersApplied && (
            <span
              onClick={() => {
                setCredentialFilter("");
                setCredentialFilterSelected(false);
                setSelectedCredential("");
              }}
              className="cursor-pointer bg-[#00467F] flex gap-[8px] items-center rounded-[6px] py-[8px] px-[12px] text-[16px] text-[white] font-[600]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="9"
                viewBox="0 0 8 9"
                fill="none"
              >
                <path
                  d="M0.412305 0.5L0 0.912888L3.5874 4.50029L0 8.08769L0.412305 8.5L3.99971 4.9126L7.58769 8.5L8 8.08711L4.4126 4.49971L8 0.912305L7.58769 0.500583L4.00058 4.08799L0.412305 0.5Z"
                  fill="white"
                ></path>
              </svg>

              <span>{selectedCredential} </span>
            </span>
          )}
          {searchQuery && (
            <span
              onClick={() => {
                setSearchQuery("");
              }}
              className="bg-[#00467F] flex gap-[8px] items-center rounded-[6px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]"
            >
              <button className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="9"
                  viewBox="0 0 8 9"
                  fill="none"
                >
                  <path
                    d="M0.412305 0.5L0 0.912888L3.5874 4.50029L0 8.08769L0.412305 8.5L3.99971 4.9126L7.58769 8.5L8 8.08711L4.4126 4.49971L8 0.912305L7.58769 0.500583L4.00058 4.08799L0.412305 0.5Z"
                    fill="white"
                  ></path>
                </svg>
              </button>
              <span>{searchQuery}</span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default CurrentFilters;
