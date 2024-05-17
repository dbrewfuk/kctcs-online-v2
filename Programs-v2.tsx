import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "./components/Header";
import HeroRfi from "./components/HeroRfi";
import programs from "./programs-v2.json";

function Programs() {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedColleges, setSelectedColleges] = useState(
    new Array(programs.length).fill({ name: "", url: "" }),
  );

  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(null);

  const toggleDropdown = (index) => {
    setSelectedCollegeIndex(selectedCollegeIndex === index ? null : index);
  };

  const [filtersChanged, setFiltersChanged] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);
  const [isAreaDropdownOpen, setIsAreaDropdownOpen] = useState(false);
  const [isCredentialDropdownOpen, setIsCredentialDropdownOpen] =
    useState(false);

  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");

  const [filtersApplied, setFiltersApplied] = useState(false);

  const [planFilter, setPlanFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");
  const [credentialFilter, setCredentialFilter] = useState("");

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const programPageURL = `/programs?search=${searchQuery}`;
    history.push(programPageURL);
  };

  // Update the filtering logic to include the program sector filter
  const filteredPrograms = programs.filter((program) => {
    // Check if the program matches the selected sector filter
    const matchesSectorFilter =
      !sectorFilter || program.sector === sectorFilter;

    // Check if the program matches the selected area filter
    const matchesAreaFilter = !areaFilter || program.program === areaFilter;

    // Check if the program matches the selected credential filter
    const matchesCredentialFilter =
      !credentialFilter ||
      program.colleges.some((college) =>
        college.academic_plans.some(
          (plan) => plan.credentials_awarded === credentialFilter,
        ),
      );

    return matchesSectorFilter && matchesAreaFilter && matchesCredentialFilter;
  });

  // Apply filters based on search query and other criteria
  const uniqueAcademicPlans = {};
  filteredPrograms.forEach((program) => {
    program.colleges.forEach((college) => {
      college.academic_plans.forEach((plan) => {
        const key = `${plan.name} - ${plan.credentials_awarded}`;
        if (!uniqueAcademicPlans[key]) {
          uniqueAcademicPlans[key] = {
            name: plan.name,
            credentials_awarded: plan.credentials_awarded,
            colleges: [],
            area: program.program,
            sector: program.sector,
          };
        }
        uniqueAcademicPlans[key].colleges.push(college);
      });
    });
  });

  // Event handler for selecting area filter
  const handleSelectedArea = (area) => {
    setSelectedArea(area);
  };

  // Event handler for selecting credential filter
  const handleSelectedCredential = (credential) => {
    setSelectedCredential(credential);
  };

  // Event handler for selecting plan filter
  const handleSelectedPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const [areaFilterSelected, setAreaFilterSelected] = useState(false);
  const [credentialFilterSelected, setCredentialFilterSelected] =
    useState(false);
  const [planFilterSelected, setPlanFilterSelected] = useState(false);

  const handleApplyFilters = () => {
    // Check if any filter has been selected
    if (selectedArea || selectedCredential || selectedPlan) {
      // Apply filters based on selected filters
      setAreaFilterSelected(!!selectedArea);
      setCredentialFilterSelected(!!selectedCredential);
      setPlanFilterSelected(!!selectedPlan);
      setAreaFilter(selectedArea);

      // Update the credential filter only if a selection is made
      if (selectedCredential) {
        setCredentialFilter(selectedCredential);
      }

      setPlanFilter(selectedPlan);
      setFiltersApplied(true); // Mark filters as applied
    } else {
      // If no filters are selected, reset the filters applied state
      setAreaFilterSelected(false);
      setCredentialFilterSelected(false);
      setPlanFilterSelected(false);
      setFiltersApplied(false);
    }
  };

  const handleClearFilters = () => {
    setSelectedCredential("");
    setSelectedArea("");
    setSelectedPlan("");
    setAreaFilter("");
    setCredentialFilter("");
    setPlanFilter("");
    setFiltersChanged(false);
    setFiltersApplied(false);
  };

  // Apply filters based on search query and other criteria
  const filteredAcademicPlans = Object.values(uniqueAcademicPlans).filter(
    (plan) => {
      const matchesSearchQuery =
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.credentials_awarded
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesSectorFilter = !sectorFilter || plan.sector === sectorFilter;

      const matchesAreaFilter = !areaFilter || plan.area === areaFilter;

      const matchesPlanFilter =
        !planFilter ||
        plan.name.toLowerCase().includes(planFilter.toLowerCase()) ||
        plan.credentials_awarded
          .toLowerCase()
          .includes(planFilter.toLowerCase());

      const matchesCredentialFilter =
        !credentialFilter ||
        plan.credentials_awarded
          .toLowerCase()
          .includes(credentialFilter.toLowerCase());

      return (
        matchesSearchQuery &&
        matchesSectorFilter &&
        matchesAreaFilter &&
        matchesPlanFilter &&
        matchesCredentialFilter
      );
    },
  );

  // Filter unique academic plan names
  const uniquePlanNames = Array.from(
    new Set(filteredAcademicPlans.map((plan) => plan.name)),
  );

  // Filter unique credentials
  const uniqueCredentials = Array.from(
    new Set(filteredAcademicPlans.map((plan) => plan.credentials_awarded)),
  );

  // Filter unique program areas
  const uniqueProgramAreas = Array.from(
    new Set(filteredPrograms.map((program) => program.program)),
  );

  // Filter unique program sectors
  const uniqueProgramSectors = Array.from(
    new Set(filteredPrograms.map((program) => program.sector)),
  );

  // Function to calculate the count of programs matching the current filter
  const getProgramCountForFilter = (filterType, filterValue) => {
    let count = 0;

    filteredAcademicPlans.forEach((plan) => {
      if (
        (!sectorFilter || plan.sector === sectorFilter) &&
        (!areaFilter || plan.area === areaFilter) &&
        (!planFilter ||
          plan.name.toLowerCase().includes(planFilter.toLowerCase()) ||
          plan.credentials_awarded
            .toLowerCase()
            .includes(planFilter.toLowerCase())) &&
        (!credentialFilter ||
          plan.credentials_awarded
            .toLowerCase()
            .includes(credentialFilter.toLowerCase()))
      ) {
        if (filterType === "Area" && plan.area === filterValue) {
          count += plan.colleges.length;
        } else if (filterType === "Plan" && plan.name === filterValue) {
          count += plan.colleges.length;
        } else if (
          filterType === "Credential" &&
          plan.credentials_awarded === filterValue
        ) {
          count += plan.colleges.length;
        }
      }
    });

    return count;
  };

  const numProgramsShowing = filteredAcademicPlans.length;

  return (
    <>
      <Header />
      <HeroRfi title="Explore Programs" highlighted="" />
      <div className="text-secondary-navy">
        <div className="bg-blue-900">
          <div className="container mx-auto px-8 py-16">
            <p className="text-3xl lg:text-4xl leading-tight font-semibold text-white text-info mb-10 lg:w-3/4">
              From{" "}
              <a className="border-b-2" href={`/programs?search=agriculture`}>
                agriculture
              </a>{" "}
              to{" "}
              <a className="border-b-2" href={`/programs?search=health`}>
                health science technology
              </a>{" "}
              to{" "}
              <a className="border-b-2" href={`/programs?search=paralegal`}>
                paralegal
              </a>
              , we offer more than 90 programs entirely online. Explore the
              options and start your journey to a better job and a better life!
            </p>
          </div>
        </div>
        <div className="container mx-auto p-8 ">
          <h4 className="text-xl font-semibold text-white">
            Search by career, interest, or program.
          </h4>
          <form onSubmit={handleSubmit} className="mt-3">
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search programs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border border-[#00467F] w-full"
              />
            </div>
          </form>
        </div>
        <div className="container mx-auto p-8 flex flex-col md:flex-row gap-3">
          <div
            className="relative w-full"
            onMouseEnter={() => setIsCredentialDropdownOpen(true)}
            onMouseLeave={() => setIsCredentialDropdownOpen(false)}
          >
            <div className="font-semibold text-[#00467F] uppercase mb-2">
              Credential
            </div>
            <div className="flex items-center justify-between border border-[#00467F] bg-white p-2">
              <span className="text-gray-600">Select</span>
              <svg
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
            {/* Credential Dropdown */}
            <div
              className={`absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 ${
                isCredentialDropdownOpen ? "block" : "hidden"
              }`}
            >
              {/* Dropdown items */}

              {/* Generate options dynamically from unique credentials */}
              {uniqueCredentials.map((credential, index) => (
                <div
                  key={index}
                  className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectedCredential(credential)}
                >
                  {credential} (
                  {getProgramCountForFilter("credential", credential)})
                </div>
              ))}
            </div>
          </div>

          {/* Program Area Dropdown */}
          <div
            className="relative  w-full"
            onMouseEnter={() => setIsAreaDropdownOpen(true)}
            onMouseLeave={() => setIsAreaDropdownOpen(false)}
          >
            <div className="font-semibold text-[#00467F] uppercase mb-2">
              Program Area
            </div>
            <div className="flex items-center justify-between border border-[#00467F] bg-white p-2">
              <span className="text-gray-600">Select</span>
              <svg
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
            {/* Area Dropdown */}
            <div
              className={`absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 ${
                isAreaDropdownOpen ? "block" : "hidden"
              }`}
            >
              {/* Dropdown items */}
              <div
                className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => setSelectedArea("")}
              >
                All Program Areas
              </div>
              {/* Generate options dynamically from unique program areas */}
              {uniqueProgramAreas.map((area, index) => (
                <div
                  key={index}
                  className="py-1 px-3 hover:bg-gray-200 cursor-pointer font-semibold text-[#00467F]"
                  onClick={() => setSelectedArea(area)}
                >
                  {area}{" "}
                  <span className="py-1 text-[14px] px-2 bg-gray-100 font-semibold text-[#00467F] rounded-lg">
                    {" "}
                    {getProgramCountForFilter("area", area)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Academic Plan Dropdown */}
          <div
            className="relative  w-full"
            onMouseEnter={() => setIsPlanDropdownOpen(true)}
            onMouseLeave={() => setIsPlanDropdownOpen(false)}
          >
            <div className="font-semibold text-[#00467F] uppercase mb-2">
              Academic Plan
            </div>
            <div className="flex items-center justify-between border border-[#00467F] bg-white p-2">
              <span className="text-gray-600">Select</span>
              <svg
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
            {/* Plan Dropdown */}
            <div
              className={`absolute mt-1 w-full bg-white rounded-lg shadow-lg z-10 ${
                isPlanDropdownOpen ? "block" : "hidden"
              }`}
            >
              {/* Dropdown items */}
              <div
                className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectedPlan(plan)}
              >
                All Plans
              </div>
              {/* Generate options dynamically from unique academic plans */}
              {Object.values(uniquePlanNames).map((name, index) => (
                <div
                  key={index}
                  className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedPlan(String(name))}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-8 py-4">
          <button
            className="bg-[#00467F] rounded-full hover:bg-blue-700 text-white font-bold py-[12px] px-[32px] rounded"
            onClick={handleApplyFilters}
          >
            Apply Filters
          </button>
        </div>

        <div className="container mx-auto px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-[#00467F] font-semibold">
                Showing {numProgramsShowing} Programs
              </span>
            </div>
            {/* Current Filters section */}
            <div className="flex items-center gap-4">
              <span className="flex text-sm gap-2">
                {areaFilterSelected && filtersApplied && (
                  <span className="inline-block bg-[#00467F] p-3 text-[1rem] text-white">
                    {selectedArea}{" "}
                    <button
                      className="ml-1"
                      onClick={() => {
                        setAreaFilter("");
                        setAreaFilterSelected(false);
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
                  </span>
                )}
                {filtersApplied && selectedPlan && (
                  <span className="inline-block bg-[#00467F] p-3 text-[1rem] text-white">
                    {selectedPlan}{" "}
                    <button
                      className="ml-1"
                      onClick={() => {
                        setPlanFilter("");
                        setPlanFilterSelected(false);
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
                  </span>
                )}
                {credentialFilterSelected && filtersApplied && (
                  <span className="inline-block bg-[#00467F] p-3 text-[1rem] text-white">
                    {selectedCredential}{" "}
                    <button
                      className="ml-1"
                      onClick={() => {
                        setCredentialFilter("");
                        setCredentialFilterSelected(false);
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
                  </span>
                )}
                {filtersApplied && searchQuery && (
                  <span className="inline-block flex items-center gap-2 bg-[#00467F] p-2 text-[1rem] text-white">
                    <button
                      onClick={() => setSearchQuery("")}
                      className="ml-1 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="auto"
                        viewBox="0 0 8 9"
                        fill="none"
                      >
                        <path
                          d="M0.412305 0.5L0 0.912888L3.5874 4.50029L0 8.08769L0.412305 8.5L3.99971 4.9126L7.58769 8.5L8 8.08711L4.4126 4.49971L8 0.912305L7.58769 0.500583L4.00058 4.08799L0.412305 0.5Z"
                          fill="white"
                        />
                      </svg>
                    </button>
                    {searchQuery}
                  </span>
                )}
              </span>
            </div>
            {/* Clear Filters button */}
            <div className="">
              <button
                className="flex items-center gap-2 text-[#00467F] border-[#00467F] hover:underline cursor-pointer"
                onClick={handleClearFilters}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="9"
                    viewBox="0 0 8 9"
                    fill="none"
                  >
                    <path
                      d="M0.412305 0.5L0 0.912888L3.5874 4.50029L0 8.08769L0.412305 8.5L3.99971 4.9126L7.58769 8.5L8 8.08711L4.4126 4.49971L8 0.912305L7.58769 0.500583L4.00058 4.08799L0.412305 0.5Z"
                      fill="#00467F"
                    />
                  </svg>
                </span>
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 gap-6">
            {filteredAcademicPlans.map((plan, index) => {
              // Check if the program sector matches the selected filter
              const matchesSectorFilter =
                !sectorFilter || plan.sector === sectorFilter;
              // Check if the program area matches the selected filter
              const matchesAreaFilter = !areaFilter || plan.area === areaFilter;

              // Check if the academic plan matches the selected filter
              const matchesPlanFilter =
                !planFilter ||
                plan.name.toLowerCase().includes(planFilter.toLowerCase()) ||
                plan.credentials_awarded
                  .toLowerCase()
                  .includes(planFilter.toLowerCase());

              // Check if the academic plan matches the selected credential filter
              const matchesCredentialFilter =
                !credentialFilter ||
                plan.credentials_awarded
                  .toLowerCase()
                  .includes(credentialFilter.toLowerCase());

              // Render the program only if it matches all filters
              if (
                matchesSectorFilter &&
                matchesAreaFilter &&
                matchesPlanFilter &&
                matchesCredentialFilter
              ) {
                return (
                  <div className="flex flex-col rounded-none" key={index}>
                    <div className="flex flex-col h-full justify-between">
                      <div className="flex justify-between items-center py-6 border-b">
                        <div className="flex items-center gap-4">
                          <h3 className="text-3xl text-[#00467F] font-semibold">
                            {plan.name}{" "}
                          </h3>
                          <span className="py-2 font-semibold text-[#00467F] px-2 bg-gray-100 rounded text-[14px]">
                            {plan.credentials_awarded}
                          </span>
                        </div>
                        {plan.colleges.length > 0 ? (
                          <div>
                            <div
                              className="px-[32px] rounded-full py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold bg-gray-100 text-[#00467F] text-[18px] text-center"
                              onClick={() => {
                                toggleDropdown(index);
                              }}
                            >
                              {selectedColleges[index]?.name
                                ? selectedColleges[index]?.name
                                : `Available at ${plan.colleges.length} Colleges`}
                            </div>
                            {selectedCollegeIndex === index && (
                              <div className="p-4 absolute bg-white border shadow flex flex-col items-center gap-2">
                                {plan.colleges.map((college, collegeIndex) => (
                                  <div
                                    className="font-semibold text-[#00467F] cursor-pointer"
                                    key={collegeIndex}
                                    onClick={() => {
                                      handleCollegeChange(
                                        index,
                                        college.name,
                                        college.url,
                                      );
                                      toggleDropdown(index);
                                    }}
                                  >
                                    {college.name}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <button
                            type="button"
                            className=" bg-gray-300 w-100 mb-2"
                            disabled
                          >
                            No Colleges Available
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null; // If the program does not match the filters, return null
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Programs;
