import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";

const ProgramResultCards = ({ filteredAcademicPlans, showLimit, filters }) => {
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [expandedPrograms, setExpandedPrograms] = useState({});
  const [selectedColleges, setSelectedColleges] = useState([]);
  const [selectedCollegeIndex, setSelectedCollegeIndex] = useState(null);

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter],
    );
  };

  const toggleExpanded = (index) => {
    setExpandedPrograms((prevExpanded) => ({
      ...prevExpanded,
      [index]: !prevExpanded[index],
    }));
  };

  const toggleDropdown = (index) => {
    setSelectedCollegeIndex((prevIndex) =>
      prevIndex === index ? null : index,
    );
  };

  const handleCollegeChange = (index, name, url, overview) => {
    setSelectedColleges((prevSelectedColleges) => {
      const updatedColleges = [...prevSelectedColleges];
      updatedColleges[index] = { name, url, overview };
      return updatedColleges;
    });
  };

  useEffect(() => {
    // Additional logic can be added here if needed for side effects related to props
  }, [filteredAcademicPlans, showLimit, filters]);

  return (
    <motion.div
      className={`w-full `}
      initial={{ opacity: 0, y: 50 }} // Fade up effect
      animate={{ opacity: 1, y: 0 }} // Fade up effect
      transition={{ duration: 0.25 }}
    >
      <div className="w-full overflow-scroll relative bg-[white] border-[#00467F]">
        <div className="h-full">
          <div className="container  flex flex-col mx-auto">
            {filters && (
              <div className="flex flex-wrap gap-2 p-2">
                {filters.map((filter, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange(filter)}
                    className={`border px-2 py-1 rounded-md text-sm ${
                      selectedFilters.includes(filter)
                        ? "bg-blue-500 text-white"
                        : "bg-white text-blue-500"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            )}
            {/* Results section */}

            <div className="flex gap-[16px] group">
              {filteredAcademicPlans
                .filter(
                  (plan) =>
                    selectedFilters.length === 0 ||
                    selectedFilters.includes(plan.name),
                )
                .slice(0, showLimit)
                .sort((a, b) => {
                  // Check if a and b are defined before accessing their properties
                  if (a && b && a.name && b.name) {
                    return a.name.localeCompare(b.name);
                  } else {
                    // Handle the case where either a or b (or their names) is undefined
                    return 0; // or any other appropriate value
                  }
                })
                .map((plan, index) => (
                  <div
                    key={index}
                    className={`hover:opacity-100 w-[350px] rounded-[12.5px] hover:shadow-[0_4px_4px_rgba(0,0,0,0.15)] transition-all bg-[#3bb3e5] ease-in-out duration-[200ms] ${expandedPrograms[index] ? "absolute w-[105%] border-[1px] left-[-2.5%] transform translate-y-[-4px] z-[9]" : ""} ${index === filteredAcademicPlans.length - 1 ? "" : "border-b-[1px]"}`}
                  >
                    {/* Render each unique academic plan */}
                    <div className="transition-all h-full text-[#00467F]  group-hover:hover:opacity-[1] transition ease duration-[200ms] cursor-pointer">
                      <div className="flex flex-col h-full justify-between relative">
                        <div
                          className="flex flex-col h-full justify-between cursor-pointer"
                          onClick={() => toggleExpanded(index)}
                        >
                          <div className="flex p-[24px] flex-col items-start md:flex-row gap-[8px]">
                            <h3 className="text-[24px] pt-[24px]  leading-[24px]  font-semibold pr-[48px]">
                              <span>{plan.name}</span>
                              <span className="align-super ml-[12px] py-[4px] border-b border-[#00467F] inline font-[400] text-[14px]">
                                {plan.credentials_awarded}
                              </span>
                            </h3>
                          </div>
                          <div className="w-full h-[150px]">
                            <img
                              className="w-full h-full object-cover"
                              src="./src/assets/as1.jpeg"
                              alt="arrow"
                            />
                          </div>

                          <div
                            className={`absolute right-[0px] top-[24px] transform transition-transform ease-in-out duration-250 ${expandedPrograms[index] ? "rotate-45" : "rotate-0"}`}
                          >
                            <svg
                              width="33"
                              height="34"
                              viewBox="0 0 33 34"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.7792 0.904053L16.0287 0.90529L16.0287 16.1254L0.808594 16.1254L0.808594 17.8746H16.0287L16.0299 33.0959L17.7804 33.0947V17.8746H33.0005L32.9992 16.1266L17.7798 16.1272L17.7792 0.904053Z"
                                fill="#00467F"
                              />
                            </svg>
                          </div>
                        </div>
                        {expandedPrograms[index] && (
                          <div className="flex flex-col pb-[48px]">
                            <div className="w-full">
                              <div className="text-[24px] font-[800] mb-[16px]">
                                Sorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                              </div>
                              <p className="text-[18px] mb-[24px]">
                                Sorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc vulputate libero et velit
                                interdum, ac aliquet odio mattis. Sorem ipsum
                                dolor sit amet, consectetur adipiscing elit.
                                Nunc vulputate libero et velit interdum, ac
                                aliquet odio mattis. Sorem ipsum dolor sit amet,
                                consectetur adipiscing elit. Nunc vulputate
                                libero et velit interdum, ac aliquet odio
                                mattis.
                              </p>
                              <p>{selectedColleges[index]?.overview}</p>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center">
                              {plan.colleges.length > 0 ? (
                                <div>
                                  <div className="w-full">
                                    <p>{selectedColleges[index]?.overview}</p>
                                  </div>
                                  <div className="relative inline-block">
                                    <div
                                      className="border inline-flex gap-[8px] text-[18px] items-center border-[#00467F] font-[600] py-[12px] px-[32px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer  text-[#00467F]"
                                      onClick={() => {
                                        toggleDropdown(index);
                                      }}
                                    >
                                      {selectedColleges[index]?.name
                                        ? selectedColleges[index]?.name
                                        : `Available at ${plan.colleges.length}  College${plan.colleges.length > 1 ? "s" : ""}`}
                                      <span>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="16"
                                          height="16"
                                          viewBox="0 0 32 32"
                                          fill="none"
                                          className="dropdown-icon ml-2"
                                        >
                                          <path
                                            d="M16.2207 24.8275L0 9.15857L1.54483 7.61374L16.1103 21.8482L30.4552 7.17236L32 8.71719L16.2207 24.8275Z"
                                            fill="#00467F"
                                          ></path>
                                        </svg>
                                      </span>
                                    </div>
                                    {selectedCollegeIndex === index && (
                                      <div className="p-4 absolute bg-white border shadow flex flex-col items-center gap-2 z-10">
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

                              <div
                                className={`pt-[24px] ${selectedColleges[index]?.name ? "block" : "hidden"}`}
                              >
                                <div className="flex justify-center pt-[24px] gap-[16px] pb-[16px]">
                                  <a
                                    className="text-[#00467F] font-semibold"
                                    href="https://catalog.kctcs.edu/programs-of-study/aas/visual-communication-multimedia/web-design-certificate/"
                                  >
                                    View in Course Catalog
                                  </a>
                                  <a
                                    className="text-[#00467F] font-semibold"
                                    href="{selectedColleges[index]?.url}"
                                  >
                                    Visit Program Page
                                  </a>
                                </div>

                                <div className="flex flex-col items-center">
                                  <button
                                    type="button"
                                    className="px-[32px] rounded-full border py-[12px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold bg-[#00467F] text-white text-[18px] hover:bg-[white] hover:text-[#00467F] transition ease-in-out duration-250 hover:border-[#00467F] text-center"
                                  >
                                    Request Information
                                  </button>
                                </div>
                              </div>
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
    </motion.div>
  );
};

export default ProgramResultCards;
