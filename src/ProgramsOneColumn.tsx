import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Header from "./components/Header";
import HeroRfi from "./components/HeroRfi";
import programs from "./programs-20240207.json";
import Filters from "./components/Filters";
import CurrentFilters from "./components/CurrentFilters";
import KeywordSearch from "./components/KeywordSearch";

function Programs() {
  const history = useHistory();
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [academicPlans, setAcademicPlans] = useState([]);
  const [uniqueCredentials, setUniqueCredentials] = useState([]);
  const [uniqueProgramAreas, setUniqueProgramAreas] = useState([]);
  const [uniquePlanNames, setUniquePlanNames] = useState([]);
  const [filteredAcademicPlans, setFilteredAcademicPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState({}); // State to track expanded state for each program
  const [isExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState(
    Array(filteredAcademicPlans.length).fill({ name: "", url: "" }),
  );
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const stickyElement = document.getElementById("sticky-search");
      const stickyOffset = stickyElement.offsetTop;

      if (offset >= stickyOffset) {
        setIsSticky(true);
        console.log("Sticky element is at the top of the viewport or above.");
      } else {
        setIsSticky(false);
        console.log("Sticky element is below the top of the viewport.");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Extract unique credentials, program areas, and plan names
    const credentials = new Set();
    const programAreas = new Set();
    const planNames = new Set();

    programs.forEach((program) => {
      program.colleges.forEach((college) => {
        if (college.academic_plans && college.academic_plans.length > 0) {
          college.academic_plans.forEach((plan) => {
            credentials.add(plan.credentials_awarded);
            programAreas.add(program.program);
            planNames.add(plan.name);
          });
        }
      });
    });

    setUniqueCredentials(Array.from(credentials));
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
  }, []); // empty dependency array to ensure it runs only onceuseEffect(() => {

  useEffect(() => {
    // Parse the search query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);

    // Get the value of the 'search' query parameter
    const queryParamValue = queryParams.get("search");

    // Get the value of the 'sector' query parameter
    const sectorParamValue = queryParams.get("sector");

    // Update the state with the value retrieved from the query parameter
    if (queryParamValue !== searchQuery && queryParamValue !== null) {
      setSearchQuery(queryParamValue);
    }

    // Update the state with the value retrieved from the sector parameter
    if (sectorParamValue !== selectedSector && sectorParamValue !== null) {
      setSelectedSector(sectorParamValue);
    }

    // Filter the academic plans based on the search query, selected filters, etc.
    const filteredPlans = academicPlans.filter((plan) => {
      const matchesSearch =
        !searchQuery ||
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.credentials_awarded
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!selectedCredential ||
          plan.credentials_awarded === selectedCredential) &&
        (!selectedArea || plan.area === selectedArea) &&
        (!selectedPlan || plan.name === selectedPlan) &&
        (!selectedSector || plan.sector === selectedSector); // Consider the selected sector filter

      return matchesSearch && matchesFilters;
    });

    // Update the filtered academic plans state
    setFilteredAcademicPlans(filteredPlans);
  }, [
    selectedCredential,
    selectedArea,
    selectedPlan,
    selectedSector,
    academicPlans,
    searchQuery,
  ]);

  const clearSearchQuery = () => {
    setSearchQuery(""); // Clear the search query state
    history.push("/programs"); // Update the URL to remove the search query parameter
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

  return (
    <>
      <HeroRfi title="Explore Programs" highlighted="" />

      <div className="bg-[#00467F]">
        <div className="container mx-auto px-[24px] py-[32px] md:py-[56px]">
          <div>
            <p className="text-[28px] md:text-[36px] md:leading-[40px] leading-[36px] leading-tight font-[600] text-white text-info lg:w-3/4">
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
            <div className="relative w-full">
              <div className="input-label font-semibold uppercase text-[#00467F] mb-2">
                Keyword Search
              </div>
              <form className="">
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
                    className="text-[16px] leading-[24px] pl-[48px] py-[12px] border border-[#00467F] text-[#00467F] w-full"
                  />
                  {searchQuery && (
                    <span
                      onClick={clearSearchQuery} // Clear search query
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
          </div>
        </div>
      </div>
      {/* Filters Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="relative bg-white p-8 rounded-lg w-full max-w-md">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
            </button>

            <Filters
              uniqueCredentials={uniqueCredentials}
              uniqueProgramAreas={uniqueProgramAreas}
              uniquePlanNames={uniquePlanNames}
              selectedCredential={selectedCredential}
              setSelectedCredential={setSelectedCredential}
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              programs={programs}
            />
          </div>
        </div>
      )}
      <div id="sticky-search" className="flex flex-col">
        <div className="w-full lg:w-[25vw] sticky h-full top-[80px] lg:top-[100px] z-10 bg-white">
          <div className="container mx-auto px-[24px] py-[32px]">
            {" "}
            <div className="flex flex-col gap-[24px]">
              {/* Sticky search input */}
              {/* {isSticky && (
                <form className="">
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
                      className="text-[16px] leading-[24px] pl-[48px] py-[12px] border border-[#00467F] text-[#00467F] w-full"
                    />
                    {searchQuery && (
                      <span
                        onClick={clearSearchQuery} // Clear search query
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
              )}*/}
              <div
                className="flex lg:hidden items-center text-[16px] py-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white p-2"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="">Filter</span>
                <svg
                  className=""
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
              <div className="hidden lg:flex">
                <Filters
                  uniqueCredentials={uniqueCredentials}
                  uniqueProgramAreas={uniqueProgramAreas}
                  uniquePlanNames={uniquePlanNames}
                  selectedCredential={selectedCredential}
                  setSelectedCredential={setSelectedCredential}
                  selectedArea={selectedArea}
                  setSelectedArea={setSelectedArea}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                  programs={programs}
                />
              </div>
              <div className="container mx-auto">
                <div className="flex flex-col items-center gap-4">
                  <span className="text-semibold text-[#00467F]">
                    {filteredAcademicPlans.length} Programs
                  </span>
                  <span className="flex text-sm flex-wrap gap-2">
                    {selectedArea && (
                      <span className="bg-[#00467F] flex gap-[12px] items-center  overflow-hidden text-ellipsis whitespace-nowrap rounded-[6px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]">
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
                    {selectedPlan && (
                      <span
                        onClick={() => {
                          setSelectedPlan("");
                        }}
                        className="bg-[#00467F] flex gap-[8px] overflow-hidden text-ellipsis whitespace-nowrap items-center rounded-[6px] px-[12px] py-[8px] text-[16px] text-[white] font-[600]"
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
        <div className="w-full">
          <div className="bg-[#fafafa] h-full">
            <div className="container flex flex-col gap-[32px] mx-auto px-[24px] py-[32px]">
              {/* Results section */}
              <div className="grid grid-cols-1">
                {filteredAcademicPlans
                  .slice()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((plan, index) => (
                    <div key={index}>
                      {/* Render each unique academic plan */}
                      <div className="transition-all ease duration-[200ms] border-b">
                        <div className="flex flex-col h-full justify-between relative">
                          <div className="flex justify-between">
                            <div className="flex py-[24px] flex-col items-start md:flex-row gap-[8px]">
                              <h3
                                className="text-[32px] leading-[36px] text-[#00467F] font-semibold"
                                onClick={() => toggleExpanded(index)}
                              >
                                {plan.name}
                              </h3>
                              <span className="py-[8px] inline-block font-semibold text-[#00467F] px-2 bg-gray-100 rounded text-[14px]">
                                {plan.credentials_awarded}
                              </span>
                            </div>
                            <div className="absolute right-[24px] top-[24px]"></div>
                          </div>
                          {expandedPrograms[index] && (
                            <div className="flex flex-row pb-[48px]">
                              <div className="w-full">
                                <p>{selectedColleges[index]?.overview}</p>
                              </div>
                              <div className="w-full">
                                {plan.colleges.length > 0 ? (
                                  <div>
                                    <div className="w-full">
                                      <p>{selectedColleges[index]?.overview}</p>
                                    </div>
                                    <div className="text-[#00467F] font-semibold mb-[8px]">
                                      Available at {plan.colleges.length}{" "}
                                      College
                                      {plan.colleges.length > 1 ? "s" : ""}
                                    </div>
                                    <div
                                      className="px-[24px] border border-[#00467F] py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer  text-[#00467F]"
                                      onClick={() => {
                                        toggleDropdown(index);
                                      }}
                                    >
                                      {selectedColleges[index]?.name
                                        ? selectedColleges[index]?.name
                                        : `Choose a College`}
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
                                                  college.overview,
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
                                {/* Here you should place the selected college's URL */}
                                <div className="flex justify-center pt-[24px] pb-[16px] gap-[16px]">
                                  <a
                                    className="text-[#00467F] font-semibold"
                                    href="https://catalog.kctcs.edu/programs-of-study/aas/visual-communication-multimedia/web-design-certificate/"
                                  >
                                    Course Catalog
                                  </a>
                                  <a
                                    className="text-[#00467F] font-semibold"
                                    href="{selectedColleges[index]?.url}"
                                  >
                                    {selectedColleges[index]?.overview}
                                  </a>
                                </div>
                                <button
                                  type="button"
                                  className="px-[24px] w-full rounded-full py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold bg-[#00467F] text-white text-[18px] text-center"
                                >
                                  Request Information
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Programs;
