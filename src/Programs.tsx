import React, { useState, useEffect } from "react";
import programs from "./programs.json";
import Testimonial from "./components/Testimonial";
import Header from "./components/Header";
import HeroRfi from "./components/HeroRfi";

type College = Partial<{
  name: string;
  url: string;
  tracks: string;
}>;

function Programs() {
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get("search") || "";
  const programParam = searchParams.get("program") || "";
  const interestParam = searchParams.get("interest") || "";

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedProgram, setSelectedProgram] = useState(programParam);
  const [selectedInterest, setSelectedInterest] = useState(interestParam);

  useEffect(() => {
    setSearchQuery(searchParam);
    setSelectedProgram(programParam);
    setSelectedInterest(interestParam);
  }, [searchParam, programParam, interestParam]);

  const [selectedColleges, setSelectedColleges] = useState(
    new Array(programs.length).fill({ name: "", url: "" }),
  );

  const handleCollegeChange = (index, collegeName, collegeUrl) => {
    const updatedSelectedColleges = [...selectedColleges];
    updatedSelectedColleges[index] = {
      name: collegeName,
      url: collegeUrl,
    };
    setSelectedColleges(updatedSelectedColleges);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(
    new Array(programs.length).fill(false),
  );

  const toggleDropdown = (index) => {
    setIsDropdownOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const programPageURL = `/programs?search=${searchQuery}`;
    history.push(programPageURL);
  };

  const filteredPrograms = programs.filter(
    (program) =>
      program.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (program.keywords &&
        program.keywords.toLowerCase().includes(searchQuery.toLowerCase())),
  );

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
                  className="p-2 border border-gray-300 rounded-lg w-full"
                />
              </div>
            </form>
          </div>
        </div>

        <div className="container mx-auto px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms
              .sort((a, b) => a.program.localeCompare(b.program))
              .map((program, index) => (
                <div
                  className="border flex flex-col border-gray-300 rounded-none hover:shadow-md"
                  key={index}
                >
                  <div className="aspect-w-1 aspect-h-1">
                    <img
                      className="w-full h-full object-cover"
                      src="https://via.placeholder.com/400x400"
                      alt="Placeholder"
                    />
                  </div>
                  <div className="flex flex-col h-full justify-between">
                    <div className="p-5">
                      <h3 className="text-3xl text-blue-900 font-semibold mb-5">
                        {program.program}
                      </h3>
                      <p className="text-blue-900 mb-6">
                        {program.description}
                      </p>
                      {program.colleges.length > 0 ? (
                        <div>
                          <div
                            className="px-6 rounded-full py-2 whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-semibold border text-blue-900 text-center w-full"
                            onClick={() => {
                              toggleDropdown(index);
                            }}
                          >
                            {selectedColleges[index]?.name
                              ? selectedColleges[index]?.name
                              : `Available at ${program.colleges.length} Colleges`}
                          </div>
                          <div
                            id={`college-select-${index}`}
                            className="form-select w-full"
                          ></div>
                          {isDropdownOpen[index] && (
                            <div className="p-4 absolute bg-white border shadow flex flex-col gap-2">
                              {program.colleges.map((college, collegeIndex) => (
                                <div
                                  className="font-semibold text-blue-900 cursor-pointer"
                                  key={collegeIndex}
                                  onClick={() => {
                                    handleCollegeChange(
                                      index,
                                      college.name,
                                      college.url,
                                    );
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
                          className="btn btn-outline-dark w-100 mb-2"
                          disabled
                        >
                          No Colleges Available
                        </button>
                      )}
                    </div>
                    {selectedColleges[index]?.name && (
                      <div className="flex flex-col lg:flex-row border-t p-6">
                        <button
                          className="bg-blue-900 py-3 px-6 text-white font-semibold rounded-full w-full"
                          href=""
                        >
                          Request Information
                        </button>
                        <a
                          className="text-blue-900 py-4 px-5 font-semibold text-center rounded-full w-full"
                          href={selectedColleges[index]?.url || "#"}
                        >
                          Visit College Website
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Programs;
