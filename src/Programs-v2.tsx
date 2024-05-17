import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import HeroRfi from "./components/HeroRfi";
import programs from "./programs-20240510";
import Filters from "./components/Filters";
import CurrentFilters from "./components/CurrentFilters";
import KeywordSearch from "./components/KeywordSearch";
import ProgramResults from "./components/ProgramResults";

function Programs() {
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [uniqueSectors, setUniqueSectors] = useState("");
  const [uniqueCredentialTypes, setUniqueCredentialTypes] = useState([]);
  const [selectedCredentialTypes, setSelectedCredentialTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [academicPlans, setAcademicPlans] = useState([]);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [searchQueryFromURL, setSearchQueryFromURL] = useState("");
  const [uniqueCredentials, setUniqueCredentials] = useState([]);
  const [uniqueProgramAreas, setUniqueProgramAreas] = useState([]);
  const [uniquePlanNames, setUniquePlanNames] = useState([]);
  const [filteredAcademicPlans, setFilteredAcademicPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState({}); // State to track expanded state for each program
  const [isExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState(
    Array(filteredAcademicPlans.length).fill({ name: "", url: "" }),
  );
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  // Other useEffect hooks remain unchanged

  const handleSectorChange = (e) => {
    const selectedSector = e.target.value;
    setSelectedSector(selectedSector);

    // Update URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("sector", selectedSector);
    const newParamsString = urlSearchParams.toString();
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParamsString}`,
    );
  };

  const handleCredentialTypeChange = (e, credentialType) => {
    // Check if the credential type is already selected
    const isSelected = selectedCredentialTypes.includes(credentialType);

    // If the credential type is already selected, remove it from the selected types
    // If not selected, add it to the selected types
    const updatedSelectedTypes = isSelected
      ? selectedCredentialTypes.filter((type) => type !== credentialType)
      : [...selectedCredentialTypes, credentialType];

    setSelectedCredentialTypes(updatedSelectedTypes);

    // Update URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("credentialTypes", updatedSelectedTypes.join(","));
    const newParamsString = urlSearchParams.toString();

    // Replace the current URL without reloading the page
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${newParamsString}`,
    );
  };

  useEffect(() => {
    // Extract unique credential types from programsData
    const credentialTypesSet = new Set();

    // Iterate over each program
    programs.forEach((program) => {
      // Iterate over each college in the program
      program.colleges.forEach((college) => {
        // Check if academic plans exist and iterate over them
        if (college.academic_plans && college.academic_plans.length > 0) {
          college.academic_plans.forEach((plan) => {
            // Add the credential type to the Set
            credentialTypesSet.add(plan.credential_type);
          });
        }
      });
    });

    // Convert the Set to an array
    const uniqueTypesArray = Array.from(credentialTypesSet);

    // Update state with unique credential types
    setUniqueCredentialTypes(uniqueTypesArray);
  }, [programs]); // Empty dependency array ensures this effect runs only once
  useEffect(() => {
    // Update URL search query parameter when search query changes
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("search", searchQuery);
    const newParamsString = urlSearchParams.toString();
  }, [searchQuery]);

  useEffect(() => {
    // Extract unique credentials, program areas, and plan names
    const credentials = new Set();
    const programAreas = new Set();
    const planNames = new Set();
    const sectors = new Set();

    programs.forEach((program) => {
      program.colleges.forEach((college) => {
        if (college.academic_plans && college.academic_plans.length > 0) {
          college.academic_plans.forEach((plan) => {
            credentials.add(plan.credentials_awarded);
            programAreas.add(program.program);
            sectors.add(program.sector);
            planNames.add(plan.name);
          });
        }
      });
    });

    setUniqueCredentials(Array.from(credentials));
    setUniqueSectors(Array.from(sectors));
    setUniqueProgramAreas(Array.from(programAreas));
    setUniquePlanNames(Array.from(planNames));
  }, []);

  // useEffect to populate academicPlans with unique academic plans data
  useEffect(() => {
    // Function to extract unique academic plans from programs data
    const getUniqueAcademicPlans = () => {
      const uniquePlans = {};

      programs.forEach((program) => {
        program.colleges.forEach((college) => {
          if (college.academic_plans && college.academic_plans.length > 0) {
            college.academic_plans.forEach((plan) => {
              const key = `${plan.name} - ${plan.credentials_awarded}`;
              if (!uniquePlans[key]) {
                uniquePlans[key] = {
                  name: plan.name,
                  credentials_awarded: plan.credentials_awarded,
                  credential_type: plan.credential_type,
                  colleges: [],
                  area: program.program,
                  sector: program.sector,
                };
              }

              uniquePlans[key].colleges.push(college);
            });
          }
        });
      });

      return Object.values(uniquePlans);
    };

    // Update academicPlans state with unique academic plans data
    const uniqueAcademicPlans = getUniqueAcademicPlans();
    setAcademicPlans(uniqueAcademicPlans);
  }, [programs]); // empty dependency array to ensure it runs only onceuseEffect(() => {

  useEffect(() => {
    // Initialize search query from URL when component mounts
    const urlSearchParams = new URLSearchParams(window.location.search);
    const searchQueryParam = urlSearchParams.get("search");

    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
    }
  }, []);

  const handleSearchClick = (searchVal: string) => {
    setSearchQuery(searchVal);
  };

  useEffect(() => {
    // Update URL search query parameter when search query changes
    if (searchQuery !== "") {
      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.set("search", searchQuery);
      const newParamsString = urlSearchParams.toString();
    }
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // useEffect hook to scroll to top when filtered results change
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }, [filteredAcademicPlans]);
  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const credential = urlParams.get("credential");
    const area = urlParams.get("area");
    const plan = urlParams.get("plan");
    const credentialTypes = urlParams.get("credentialTypes");
    const sector = urlParams.get("sector");

    // Update state with parsed URL parameters

    const credentialTypesArray = credentialTypes
      ? credentialTypes.split(",")
      : [];

    // Set the state only if credentialTypesArray is different from the current state
    if (
      JSON.stringify(credentialTypesArray) !==
      JSON.stringify(selectedCredentialTypes)
    ) {
      setSelectedCredentialTypes(credentialTypesArray);
    }

    // Filter the academic plans based on the search query, selected filters, etc.
    const filteredPlans = academicPlans.filter((plan) => {
      // Check if the plan's credential type is included in the selected credential types
      const matchesCredentialTypes =
        selectedCredentialTypes.length === 0 ||
        selectedCredentialTypes.includes(plan.credential_type);

      // Check if the plan matches the search query
      const matchesSearch =
        !searchQuery ||
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.credentials_awarded
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Other filtering conditions remain unchanged
      const matchesFilters =
        (!selectedCredential || plan.credential_type === selectedCredential) &&
        (!selectedArea || plan.area === selectedArea) &&
        (!selectedSector || plan.sector === selectedSector) &&
        (!selectedPlan || plan.name === selectedPlan);

      return matchesSearch && matchesCredentialTypes && matchesFilters;
    });

    // Update the filtered academic plans state
    setFilteredAcademicPlans(filteredPlans);
  }, [
    selectedCredential,
    selectedArea,
    selectedPlan,
    selectedSector,
    selectedCredentialTypes,
    academicPlans,
    programs,
    searchQuery,
  ]);

  const clearSearchQuery = () => {
    setSearchQuery(""); // Clear the search query state// Update the URL to remove the search query parameter
  };

  // Modify the toggleExpanded function to toggle the expansion state for a specific index
  const toggleExpanded = (index) => {
    setExpandedPrograms((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index], // Toggle the expanded state for the given index
    }));
  };

  const handleToggleExpand = (index) => {
    toggleExpanded(index);
  };

  const toggleDropdown = (index) => {
    setSelectedCollegeIndex(selectedCollegeIndex === index ? null : index);
  };

  const handleCollegeChange = (index, name, url, overview) => {
    setSelectedColleges((prevSelectedColleges) => {
      const updatedColleges = [...prevSelectedColleges];
      updatedColleges[index] = { name, url, overview };
      return updatedColleges;
    });
  };

  const filterRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef && !filterRef.current.contains(event.target)) {
        setFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Header isActive="programs" />
      <div id="sticky-search" className="flex flex-col lg:flex-row ">
        <div
          id="sticky-search"
          className="w-full lg:min-w-[25vw] lg:max-w-[25vw] sticky h-full z-10 bg-white lg:top-[80px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] lg:shadow-[none]"
        >
          <div className="container mx-auto px-[24px] py-[24px] lg:py-[48px] lg:pl-[56px] lg:pr-[32px]">
            {" "}
            <div className="flex flex-col">
              <div className="lg:block">
                <div className=" text-[#00467F] text-[32px] leading-[36px] font-[800] mb-[12px]">
                  Unlock Your Future: Explore 90+ Online Program Options
                </div>
                <p className="text-[#00467F] text-[18px] mb-[24px]">
                  From{" "}
                  <a
                    className="cursor-pointer border-b-2"
                    onClick={() => handleSearchClick("agriculture")}
                  >
                    agriculture
                  </a>{" "}
                  to{" "}
                  <a
                    className="cursor-pointer border-b-2"
                    onClick={() => handleSearchClick("health")}
                  >
                    health science technology
                  </a>{" "}
                  to{" "}
                  <a
                    className="cursor-pointer border-b-2"
                    onClick={() => handleSearchClick("Paralegal")}
                  >
                    paralegal
                  </a>
                  , we offer more than 90 programs entirely online. Explore the
                  options and start your journey to a better job and a better
                  life!
                </p>
              </div>

              <div className="sticky">
                <input
                  type="text"
                  placeholder="Search programs"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="text-[16px] lg:hidden border-[6px] mb-[24px] transition ease-in-out duration-[250ms] border-[transparent] focus:border-[#fdd000] focus:outline-none text-[#00467F] leading-[24px] pl-[24px] py-[12px] bg-[#f3f3f3] text-[#00467F] w-full"
                />
                <form className="hidden lg:block mb-[24px]">
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
                      onChange={handleSearchInputChange}
                      className="text-[16px] border-[6px] transition ease-in-out duration-[250ms] border-[transparent] focus:border-[#fdd000] focus:outline-none text-[#00467F] leading-[24px] pl-[48px] py-[12px] bg-[#f3f3f3] text-[#00467F] w-full"
                    />
                    {searchQuery && (
                      <span
                        onClick={clearSearchQuery} // Clear search query
                        className="absolute cursor-pointer mr-[16px] right-0 w-[18px] text-white rounded-md transition-colors duration-300 hover:bg-opacity-80 focus:outline-none"
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
                <div>
                  <div
                    className="inline-block items-center justify-center text-[16px] py-[12px] px-[32px] hover:bg-[white] transition ease-in-out duration-[250ms] cursor-pointer hover:border-[#00467F] text-[#00467F] font-[600] text-center  rounded-full border border-[transparent] bg-[#f5f5f5]"
                    onClick={() => setFilterOpen(true)}
                  >
                    <span className="">Filter</span>
                  </div>
                </div>

                <div className="lg:flex flex-col gap-[24px]">
                  <div
                    ref={filterRef}
                    className={`
                    fixed p-[32px] bg-[white] shadow-[0px_2px_4px_rgba(0,0,0,0.15)] top-[50%] max-w-[720px] left-[50%] transform translate-x-[-50%] translate-y-[-50%] 
                    m-[24px] w-[calc(100%-48px)] left-0 h-auto flex-col 
                    ${filterOpen ? "lg:flex" : "hidden"}
                  `}
                  >
                    {" "}
                    <Filters
                      uniqueCredentials={uniqueCredentials}
                      uniqueCredentialTypes={uniqueCredentialTypes}
                      setUniqueCredentialTypes={setUniqueCredentialTypes}
                      selectedCredentialTypes={selectedCredentialTypes}
                      setSelectedCredentialTypes={setSelectedCredentialTypes}
                      handleCredentialTypeChange={handleCredentialTypeChange}
                      uniqueProgramAreas={uniqueProgramAreas}
                      uniquePlanNames={uniquePlanNames}
                      setSelectedSector={setSelectedSector}
                      selectedSector={selectedSector}
                      setUniqueSectors={setUniqueSectors}
                      uniqueSectors={uniqueSectors}
                      selectedCredential={selectedCredential}
                      setSelectedCredential={setSelectedCredential}
                      selectedArea={selectedArea}
                      setSelectedArea={setSelectedArea}
                      selectedPlan={selectedPlan}
                      setSelectedPlan={setSelectedPlan}
                      programs={programs}
                      searchQuery={searchQuery}
                      backgroundColor={"light"}
                    />
                  </div>

                  <div className="container  mt-[24px]">
                    <div className="flex flex-col ">
                      <span className="flex text-[14px] flex-wrap gap-[12px]">
                        {selectedArea && (
                          <span className="bg-[#00467F] flex gap-[12px] items-center  overflow-hidden text-ellipsis whitespace-nowrap rounded-[4px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]">
                            <button
                              className=""
                              onClick={() => {
                                setSelectedArea("");
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
                            <span>{selectedArea} </span>
                          </span>
                        )}{" "}
                        {selectedSector && (
                          <span className="bg-[#00467F] flex gap-[12px] items-center  overflow-hidden text-ellipsis whitespace-nowrap rounded-[4px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]">
                            <button
                              className=""
                              onClick={() => {
                                setSelectedSector("");
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
                            <span>{selectedSector} </span>
                          </span>
                        )}{" "}
                        {selectedPlan && (
                          <span
                            onClick={() => {
                              setSelectedPlan("");
                            }}
                            className="bg-[#00467F] flex gap-[8px] overflow-hidden text-ellipsis whitespace-nowrap items-center rounded-[4px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]"
                          >
                            <button
                              className=""
                              onClick={() => {
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
                        {selectedCredential && (
                          <span
                            onClick={() => {
                              setSelectedCredential("");
                            }}
                            className="cursor-pointer bg-[#00467F] overflow-hidden text-ellipsis whitespace-nowrap flex gap-[8px] items-center rounded-[6px] py-[8px] px-[12px] text-[16px] text-[white] font-[600]"
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
                            onClick={clearSearchQuery}
                            className="bg-[#00467F] flex gap-[8px] overflow-hidden text-ellipsis whitespace-nowrap items-center rounded-[6px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]"
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
                </div>
              </div>
            </div>
            <div className="hidden lg:block pt-[32px] mt-[32px] border-t border-[#f3f3f3]">
              <a
                href="https://kctcs.edu/class-search.aspx"
                type="button"
                className="inline-block hover:bg-[white] border border-[#f3f3f3] transition ease-in-out duration-250 hover:text-[#00467F] hover:border-[#00467F] px-[32px] rounded-full py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold bg-[#f3f3f3] text-[#00467F] text-[16px] text-center"
              >
                Online Courses
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:border-l-[1px] border-[#f3f3f3] p-[32px] lg:p-[48px]">
          <ProgramResults
            filteredAcademicPlans={filteredAcademicPlans}
            showLimit={40}
            showCount={true}
          />
        </div>
      </div>
    </>
  );
}

export default Programs;
