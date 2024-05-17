import React, { useState, useEffect } from "react";
import Button from "./Button";
import programs from "../programs-20240207";

// Dropdown component
function FilterDropdown({
  title,
  options,
  selectedOption,
  setSelectedOption,
  updateOptions,
  backgroundColor,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSelectedOption(option);
    updateOptions(title, option);
    setIsOpen(false); // Close the dropdown after an option is selected
    // Add an alert to show the selected option
  };

  // Function to determine if the background color is dark or light
  const isBackgroundColorDark = () => {
    // Determine whether the background color is dark or light based on your criteria
    // You can use any logic here to determine the brightness of the background color
    // For simplicity, let's assume a light background if the backgroundColor prop is 'light'
    return backgroundColor === "dark";
  };

  const handleClearSelection = () => {
    setSelectedOption(""); // Clear the selected option
    setIsOpen(false);
  };

  return (
    <div
      className="relative w-full cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div
        className={`font-semibold uppercase mb-[4px] ${isBackgroundColorDark() ? "text-white" : "text-[#00467F]"}`}
      >
        {title}
      </div>
      <div className="flex items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white">
        <span className="overflow-hidden whitespace-nowrap text-ellipsis">
          {selectedOption || "Select"}
        </span>
        <div className="flex gap-[0px]">
          <div
            className={`rounded-full group flex items-center p-[12px] bg-[#f3f3f3] mr-[8px] justify-center cursor-pointer transition ease-in-out duration-[200ms] rounded-full" ${selectedOption ? "opacity-100" : "opacity-0"}`}
            onClick={handleClearSelection}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clipPath="url(#clip0_211_408)">
                <path
                  d="M1.64922 0L0 1.65155L14.3496 16.0012L0 30.3508L1.64922 32L15.9988 17.6504L30.3508 32L32 30.3484L17.6504 15.9988L32 1.64922L30.3508 0.0023327L16.0023 14.3519L1.64922 0Z"
                  fill="#00467F"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_211_408">
                  <rect width="32" height="32" fill="#00467F"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>

          <div className="cursor-pointer flex items-center justify-center">
            <svg
              className={`transform ${isOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16.2207 24.8276L0 9.15863L1.54483 7.6138L16.1103 21.8483L30.4552 7.17242L32 8.71725L16.2207 24.8276Z"
                fill="#00467F"
              />
            </svg>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute w-full bg-white shadow z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="py-1 px-3 text-[#00467F] hover:bg-gray-200 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Filters({
  uniqueCredentialTypes,
  uniqueCredentialType,
  setUniqueCredentialTypes,
  handleCredentialTypeChange,
  selectedCredentialTypes = [],
  setSelectedCredentialTypes,
  uniqueCredentials,
  uniquePlanNames,
  uniqueProgramAreas, // Add uniqueProgramSectors as prop
  selectedCredential,
  selectedOption,
  setSelectedCredential,
  selectedArea,
  setSelectedArea,
  setSelectedSector,
  setSelectedOption,
  selectedSector, // Add selectedSector and setSelectedSector
  uniqueSectors,
  selectedPlan,
  setSelectedPlan,
  setUniquePlanNames,
  setUniqueProgramAreas,
  programs,
  backgroundColor,
  showExplore,
}) {
  // Extract query parameters from URL when the component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const credential = queryParams.get("credential") || "";
    const area = queryParams.get("area") || "";
    const plan = queryParams.get("plan") || "";
    const sector = queryParams.get("sector") || "";

    // Update state variables with retrieved query parameters
    setSelectedCredential(credential);
    setSelectedArea(area);
    setSelectedPlan(plan);
    setSelectedSector(sector);
  }, [location.search]);

  const handleApplyClick = () => {
    const queryParams = new URLSearchParams();
    queryParams.set("credential", selectedCredential || "");
    queryParams.set("area", selectedArea || "");
    queryParams.set("sector", selectedSector || "");
    queryParams.set("plan", selectedPlan || ""); // Include sector in query params
    queryParams.set("credentialTypes", selectedCredentialTypes.join(","));

    const queryString = queryParams.toString();
    const newUrl = `/programs?${queryString}`;

    window.location.reload();
  };
  const isAnyOptionSelected = () => {
    // Check if any option is selected in any of the dropdowns
    return (
      selectedCredential ||
      selectedArea ||
      selectedSector ||
      selectedPlan ||
      selectedCredentialTypes.length > 0
    );
  };

  const updateOptions = (title, selectedOption) => {
    switch (title) {
      case "Credential":
        // Filter unique plans and areas based on the selected credential
        const filteredPlans = programs
          .flatMap((college) =>
            college.academic_plans.filter(
              (plan) =>
                plan.credential_type === selectedOption &&
                (selectedArea ? plan.area === selectedArea : true) &&
                (selectedPlan ? plan.name === selectedPlan : true),
            ),
          )
          .map((plan) => plan.name);

        const filteredAreas = programs
          .flatMap((college) =>
            college.academic_plans.filter(
              (plan) =>
                plan.credential_type === selectedOption &&
                (selectedPlan ? plan.name === selectedPlan : true),
            ),
          )
          .map((plan) => plan.area);

        // Set the unique plans and areas based on the selected credential
        setUniquePlanNames([...new Set(filteredPlans)]);
        setUniqueProgramAreas([...new Set(filteredAreas)]);

        setSelectedPlan("");

        setSelectedArea("");
        break;
      case "Program Area":
        setSelectedPlan("");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full flex flex-wrap gap-[16px]">
      <div className="flex w-full flex-wrap  gap-[16px]">
        {uniqueSectors && (
          <FilterDropdown
            title="Sector"
            options={uniqueSectors || []}
            selectedOption={selectedSector}
            setSelectedOption={setSelectedSector}
            updateOptions={updateOptions}
            backgroundColor={backgroundColor}
          />
        )}
        <FilterDropdown
          title="Program Area"
          options={uniqueProgramAreas || []}
          selectedOption={selectedArea}
          setSelectedOption={setSelectedArea}
          updateOptions={updateOptions}
          backgroundColor={backgroundColor}
        />
        <FilterDropdown
          title="Academic Plan"
          options={uniquePlanNames || []}
          selectedOption={selectedPlan}
          setSelectedOption={setSelectedPlan}
          updateOptions={updateOptions}
          backgroundColor={backgroundColor}
        />
      </div>
      <div className="flex flex-row justify-between w-full items-end mt-[16px]">
        <div className="hidden lg:flex flex flex-col gap-[8px]">
          <div
            className={`font-semibold uppercase mb-[4px] ${backgroundColor === "dark" ? "text-white" : "text-[#00467F]"}`}
          >
            Credential
          </div>
          <div className=" flex flex-row gap-[12px]">
            {uniqueCredentialTypes.map((type, index) => (
              <div key={index} className="flex gap-[8px] items-center">
                <input
                  type="checkbox"
                  id={`credentialType-${index}`}
                  value={type}
                  checked={selectedCredentialTypes.includes(type)}
                  onChange={(e) => handleCredentialTypeChange(e, type)}
                  className=""
                />
                <label
                  className={`font-[600] ${backgroundColor === "dark" ? "text-white" : "text-[#00467F]"}`}
                  htmlFor={`credentialType-${index}`}
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </div>
        {showExplore && (
          <div
            className={`transition ease-in-out duration-[250] ${isAnyOptionSelected() ? "opacity-100 translate-y-0" : "translate-y-[20px] opacity-0"}`}
          >
            <Button label="Explore" onClick={handleApplyClick} />
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default Filters;
