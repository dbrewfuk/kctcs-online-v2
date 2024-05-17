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
  const [showFilterModal, setShowFilterModal] = useState(false); // State to manage filter modal visibility
  const [filteredProgramCount, setFilteredProgramCount] = useState(0); // State to hold filtered program count
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedColleges, setSelectedColleges] = useState(
    new Array(programs.length).fill({ name: "", url: "" }),
  );

  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(null);

  const toggleDropdown = (index) => {
    setSelectedCollegeIndex(selectedCollegeIndex === index ? null : index);
  };

  const handleOpenFilterModal = () => {
    setShowFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setShowFilterModal(false);
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
      program.colleges.some((college) => {
        if (college.academic_plans) {
          return college.academic_plans.some(
            (plan) => plan.credentials_awarded === credentialFilter,
          );
        } else {
          return false; // Handle case where academic_plans is undefined
        }
      });

    return matchesSectorFilter && matchesAreaFilter && matchesCredentialFilter;
  });

  // Apply filters based on search query and other criteria
  const uniqueAcademicPlans = {};

  filteredPrograms.forEach((program) => {
    program.colleges.forEach((college) => {
      // Ensure college and academic_plans exist before accessing
      if (college && college.academic_plans) {
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
      } else {
        console.log("College or academic_plans is undefined:", college);
      }
    });
  });

  // Event handler for selecting area filter
  const handleSelectedArea = (area) => {
    setSelectedArea(area);
    setAreaFilter(area); // Update the area filter
    updateCounts();
  };

  // Event handler for selecting credential filter
  const handleSelectedCredential = (credential) => {
    setSelectedCredential(credential);
    setCredentialFilter(credential); // Update the area filter
    updateCounts();
  };

  // Event handler for selecting plan filter
  const handleSelectedPlan = (plan) => {
    setSelectedPlan(plan);
    setPlanFilter(plan); // Update the area filter
    updateCounts();
  };

  const [areaFilterSelected, setAreaFilterSelected] = useState(false);
  const [credentialFilterSelected, setCredentialFilterSelected] =
    useState(false);
  const [planFilterSelected, setPlanFilterSelected] = useState(false);

  const handleApplyFilters = () => {
    setShowFilterModal(false);
    // Check if any filter has been selected
    if (selectedArea || selectedCredential || selectedPlan) {
      // Apply filters based on selected filters
      setAreaFilterSelected(!!selectedArea);
      setCredentialFilterSelected(!!selectedCredential);
      setPlanFilterSelected(!!selectedPlan);
      setAreaFilter(selectedArea);
      setCredentialFilter(selectedCredential);
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

  const [expandedPrograms, setExpandedPrograms] = useState({}); // State to track expanded state for each program

  const toggleExpanded = (index) => {
    setExpandedPrograms((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  const handleToggleExpand = (index) => {
    toggleExpanded(index);
  };

  // Filter unique program areas
  const uniqueProgramAreas = Array.from(
    new Set(filteredPrograms.map((program) => program.program)),
  );
  const [areaCount, setAreaCount] = useState(0);
  const [planCount, setPlanCount] = useState(0);
  const [credentialCount, setCredentialCount] = useState(0);

  // Function to calculate the count for a specific filter type
  const calculateCountForFilter = (filterType, filterValue) => {
    let count = 0;

    // Iterate through filteredAcademicPlans and count matching programs
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
        if (
          (filterType === "area" && plan.area === filterValue) ||
          (filterType === "plan" && plan.name === filterValue) ||
          (filterType === "credential" &&
            plan.credentials_awarded === filterValue)
        ) {
          count += plan.colleges.length;
        }
      }
    });

    return count;
  };

  // Update counts for each filter type whenever a filter is selected or deselected
  const updateCounts = () => {
    // Calculate counts for each filter type based on currently selected values
    const newAreaCount = calculateCountForFilter("area", selectedArea);
    const newPlanCount = calculateCountForFilter("plan", selectedPlan);
    const newCredentialCount = calculateCountForFilter(
      "credential",
      selectedCredential,
    );

    // Update state variables for counts
    setAreaCount(newAreaCount);
    setPlanCount(newPlanCount);
    setCredentialCount(newCredentialCount);
  };

  // Display the total count, which is the sum of counts for all selected filters
  const totalCount = areaCount + planCount + credentialCount;

  // Filter unique program sectors
  const uniqueProgramSectors = Array.from(
    new Set(filteredPrograms.map((program) => program.sector)),
  );

  const numProgramsShowing = filteredAcademicPlans.length;

  return (
    <>
      <Header />
      <HeroRfi title="Explore Programs" highlighted="" />
      <div className="text-secondary-navy">
        <div className="bg-[#00467F]">
          <div className="container mx-auto px-[24px] py-[32px] md:py-[56px]">
            <p className="text-[24px] md:text-[32px] md:leading-[40px] leading-[32px] lg:text-4xl leading-tight font-[600] text-white text-info lg:w-3/4">
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
        <div className="flex flex-col md:flex-row">
          <div>
            <div className="container mx-auto px-[24px] py-[48px]">
              <div className="flex flex-col gap-[32px]">
                <div>
                  <h4 className="text-[18px] leading-[20px] font-semibold uppercase text-[#00467F]">
                    Search by interest, program, or career.
                  </h4>
                  <form onSubmit={handleSubmit} className="mt-3">
                    <div className="flex items-center gap-4 text-[18px] relative">
                      <span className="absolute w-[24px] ml-[12px] left-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 29.811 29.811"
                          alt="search"
                          fill="#00467F"
                        >
                          <path d="M14.884 2.25A10.5 10.5 0 009.62 3.67a10.49 10.49 0 00-4.921 6.414A10.493 10.493 0 005.754 18.1c2.735 4.738 8.613 6.556 13.496 4.344l1.82-1.05a10.476 10.476 0 004.034-5.842c.73-2.725.356-5.572-1.055-8.015s-3.688-4.19-6.414-4.922a10.66 10.66 0 00-2.751-.364zm8.606 27.561l-3.121-5.406c-5.962 2.817-13.21.626-16.563-5.18-3.533-6.12-1.43-13.97 4.689-17.504a12.74 12.74 0 019.723-1.28 12.727 12.727 0 017.779 5.97 12.73 12.73 0 011.28 9.723 12.717 12.717 0 01-4.965 7.137l3.126 5.415z"></path>
                        </svg>
                      </span>
                      <input
                        type="text"
                        placeholder="Search programs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-[48px] py-[12px] border border-[#00467F] text-[#00467F] w-full"
                      />
                      {searchQuery && (
                        <span
                          onClick={() => setSearchQuery("")} // Clear search query
                          className="absolute mr-[16px] right-0 w-[18px] text-white rounded-md transition-colors duration-300 hover:bg-opacity-80 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 27.436 27.436"
                            fill="#00467F"
                          >
                            <path d="M1.414 0L0 1.416l12.303 12.303L0 26.022l1.414 1.414 12.303-12.303 12.305 12.303 1.414-1.416-12.303-12.303L27.436 1.414 26.022.002 13.72 12.305 1.414 0z"></path>
                          </svg>
                        </span>
                      )}
                    </div>
                  </form>
                </div>
                <div>
                  <h4 className="font-semibold text-[18px] uppercase text-[#00467F] mb-2">
                    Filter By:
                  </h4>
                  <button
                    className="py-[12px] w-full justify-between flex items-center gap-2 px-[16px] border-[1.25px] text-[18px] border-[#00467F] text-[#00467F]"
                    onClick={handleOpenFilterModal}
                  >
                    Select{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      viewBox="0 0 25 25"
                      fill="none"
                    >
                      <path
                        d="M13.156 0.428037L11.8431 0.428965L11.8431 11.844L0.428052 11.844L0.428051 13.156L11.8431 13.156L11.844 24.5719L13.1569 24.571V13.156L24.5719 13.156L24.571 11.8449L13.1564 11.8454L13.156 0.428037Z"
                        fill="#00467F"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {showFilterModal && (
              <div className="fixed inset-0 z-50 overflow-y-auto flex w-full p-[32px] items-center justify-center bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm">
                <div className="p-8 max-w-[1024px] bg-white w-full shadow flex flex-col gap-3">
                  <div
                    className="relative w-full"
                    onClick={() =>
                      setIsCredentialDropdownOpen(!isCredentialDropdownOpen)
                    }
                  >
                    <div className="font-semibold text-[#00467F] uppercase mb-2">
                      Credential
                    </div>
                    <div className="flex items-center justify-between border border-[#00467F] bg-white p-2">
                      <span className="text-gray-600">
                        {" "}
                        {selectedCredential ? selectedCredential : "Select"}
                      </span>
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
                      className={`absolute w-full bg-white shadow z-10 ${
                        isCredentialDropdownOpen ? "block" : "hidden"
                      }`}
                      onClick={() =>
                        setIsCredentialDropdownOpen(!isAreaDropdownOpen)
                      }
                    >
                      {/* Generate options dynamically from unique credentials */}
                      {uniqueCredentials.map((credential, index) => (
                        <div
                          key={index}
                          className="py-1 px-3 hover:bg-gray-200 cursor-pointer"
                          onClick={() =>
                            setSelectedCredential(String(credential))
                          }
                        >
                          {credential}{" "}
                          <span className="py-1 text-[14px] px-2 bg-gray-100 font-semibold text-[#00467F] rounded-lg">
                            {calculateCountForFilter("credential", credential)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Program Area Dropdown */}
                  <div
                    className="relative  w-full"
                    onClick={() => setIsAreaDropdownOpen(!isAreaDropdownOpen)}
                  >
                    <div className="font-semibold text-[#00467F] uppercase mb-2">
                      Program Area
                    </div>
                    <div className="flex items-center justify-between border border-[#00467F] bg-white p-2">
                      <span className="text-gray-600">
                        {selectedArea ? selectedArea : "Select"}
                      </span>
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
                      className={`absolute w-full bg-white shadow z-10 ${
                        isAreaDropdownOpen ? "block" : "hidden"
                      }`}
                    >
                      {/* Dropdown items */}

                      {/* Generate options dynamically from unique program areas */}
                      {uniqueProgramAreas.map((area, index) => (
                        <div
                          key={index}
                          className="py-1 px-3 hover:bg-gray-200 cursor-pointer text-[#00467F]"
                          onClick={() => {
                            setSelectedArea(area);
                          }}
                        >
                          {area}{" "}
                          <span className="py-1 text-[14px] px-2 bg-gray-100 font-semibold text-[#00467F] rounded-lg">
                            {" "}
                            {calculateCountForFilter("area", area)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Academic Plan Dropdown */}
                  <div
                    className="relative  w-full"
                    onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
                  >
                    <div className="font-semibold text-[#00467F] uppercase mb-2">
                      Academic Plan
                    </div>
                    <div className="flex items-center justify-between border border-[#00467F] bg-white p-2">
                      <span className="text-gray-600">
                        {selectedPlan ? selectedPlan : "Select"}
                      </span>
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
                      className={`absolute  w-full bg-white shadow z-10 ${
                        isPlanDropdownOpen ? "block" : "hidden"
                      }`}
                    >
                      {/* Dropdown items */}

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
                  <div className="text-center mt-[32px]">
                    {" "}
                    <button
                      className="bg-[#00467F] rounded-full hover:bg-blue-700 text-white font-bold py-[12px] px-[24px] rounded"
                      onClick={handleApplyFilters}
                    >
                      View {totalCount} Programs
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="w-full">
            <div className="bg-[#fafafa]">
              <div className="container flex flex-col gap-[32px] mx-auto px-[24px] py-16">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[#00467F] font-semibold">
                      {numProgramsShowing} Programs
                    </span>
                  </div>
                  {/* Current Filters section */}
                  <div className="flex items-center gap-4">
                    <span className="flex text-sm gap-2">
                      {areaFilterSelected && filtersApplied && (
                        <span
                          onClick={() => {
                            setAreaFilter("");
                            setAreaFilterSelected(false);
                            setSelectedArea("");
                          }}
                          className="bg-[#00467F] flex gap-[8px] items-center rounded-[12px] px-[12px] py-[8px] text-[1rem] text-[white] font-[600]"
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
                      {planFilterSelected && filtersApplied && (
                        <span
                          onClick={() => {
                            setAreaFilter("");
                            setAreaFilterSelected(false);
                            setSelectedArea("");
                          }}
                          className="bg-[#00467F] flex gap-[8px] items-center rounded-[12px] px-[12px]py-[8px] text-[1rem] text-[white] font-[500]"
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
                          <span>{selectedPlan} </span>
                        </span>
                      )}
                      {credentialFilterSelected && filtersApplied && (
                        <span
                          onClick={() => {
                            setCredentialFilter("");
                            setCredentialFilterSelected(false);
                            setSelectedCredential("");
                          }}
                          className="cursor-pointer bg-[#00467F] flex gap-[8px] items-center rounded-[12px] py-[8px] px-[12px] text-[1rem] text-[white] font-[600]"
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
                    </span>
                  </div>

                  {filtersApplied && (
                    <div className="">
                      <button
                        className="flex items-center gap-2 text-[#00467F] border-[#00467F] cursor-pointer transition-all transition-ease duration-300"
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
                        <span
                          className="font-[600] border-b-[2px] border-[#00467F] transition-all transition-ease duration-200 border-b-[#00467F] decoration-none hover:border-b-[4px]
                        "
                        >
                          Clear Filters
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1">
                  {filteredAcademicPlans.map((plan, index) => {
                    const isExpanded = expandedPrograms[index] || false;
                    // Check if the program sector matches the selected filter
                    const matchesSectorFilter =
                      !sectorFilter || plan.sector === sectorFilter;
                    // Check if the program area matches the selected filter
                    const matchesAreaFilter =
                      !areaFilter || plan.area === areaFilter;

                    // Check if the academic plan matches the selected filter
                    const matchesPlanFilter =
                      !planFilter ||
                      plan.name
                        .toLowerCase()
                        .includes(planFilter.toLowerCase()) ||
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
                        <div
                          className={
                            isExpanded
                              ? "bg-white border"
                              : "flex flex-col border-b"
                          }
                          key={index}
                        >
                          <div className="flex flex-col h-full justify-between relative">
                            <div className="flex justify-between">
                              <div
                                className="flex px-[24px] py-[32px] flex-col items-start md:flex-row gap-[16px]"
                                onClick={() => handleToggleExpand(index)}
                              >
                                <h3 className="text-[32px] leading-[36px] text-[#00467F] font-semibold">
                                  {plan.name}{" "}
                                </h3>
                                <span className="py-2 inline-block font-semibold text-[#00467F] px-2 bg-gray-100 rounded text-[14px]">
                                  {plan.credentials_awarded}
                                </span>
                              </div>
                              <div className="absolute right-[24px] top-[24px]"></div>
                            </div>
                            {/* Add your expandable content here */}
                            {isExpanded && (
                              <div className="px-[24px] py-[16px] flex flex-col gap-[24px]">
                                {plan.colleges.length > 0 ? (
                                  <div>
                                    <div className="text-[#00467F] font-semibold mb-[8px]"></div>
                                    <div className="px-[24px] border-[1.5px] border-[#00467F] py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold text-[#00467F] text-[18px]">
                                      {selectedColleges[index]?.name
                                        ? selectedColleges[index]?.name
                                        : `Available at ${plan.colleges.length} Colleges`}
                                    </div>
                                    {selectedCollegeIndex === index && (
                                      <div className="p-4 absolute bg-white border shadow flex flex-col items-center gap-2">
                                        {plan.colleges.map(
                                          (college, collegeIndex) => (
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
                                          ),
                                        )}
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
                                <button
                                  type="button"
                                  className="px-[24px] w-full rounded-full py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold bg-[#00467F] text-white text-[18px] text-center"
                                >
                                  Request Information
                                </button>
                              </div>
                            )}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Programs;
