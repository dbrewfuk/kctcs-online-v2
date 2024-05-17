import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import programsData from "../programs.json";

function HeroRfi({ title, highlighted }) {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");

  const words = title.split(" ");
  const highlightedTitle = words.map((word, index) => {
    if (word.toLowerCase() === highlighted.toLowerCase()) {
      return (
        <span className="text-amber-500" key={index}>
          {word}{" "}
        </span>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });

  const handleFilterSubmit = (e: any) => {
    e.preventDefault();
    console.log("Selected Program:", selectedProgram);
    // Construct the URL with both searchQuery and selectedProgram as query parameters
    const searchParams = new URLSearchParams();
    searchParams.set("program", selectedProgram);

    // Combine the query parameters into the URL
    const programPageURL = `/programs?${searchParams.toString()}`;

    // Navigate to the programs page with the updated query parameters
    history.push(programPageURL);
    window.location.href = `/programs?program=${selectedProgram}`;
  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    history.push(`/programs?search=${searchQuery}`);
    window.location.href = `/programs?search=${searchQuery}`;
  };

  const degrees = [...new Set(programsData.map((program) => program.degree))];
  const availableInterests = programsData
    .filter((program) => program.degree === selectedDegree)
    .map((program) => program.sector);
  const interests = [...new Set(availableInterests)];
  const programs = programsData.filter(
    (program) => program.sector === selectedInterest,
  );
  return (
    <>
      <div className="bg-primary h-[720px] relative">
        <div className="w-full h-full">
          <video
            src="https://www.dropbox.com/s/sd90kljtxqp68dg/background-video.mp4?raw=1"
            className="object-cover w-full h-full"
            autoPlay
          ></video>
          <div className="absolute top-0 w-full h-full">
            <div className="container px-8 mx-auto  h-full">
              <div className="flex h-full items-center justify-end">
                <div className="w-full lg:w-1/2 flex flex-col">
                  <h1 className="text-5xl md:text-6xl xl:text-[76px] text-white font-black  mb-12">
                    {highlightedTitle}
                  </h1>

                  <div>
                    <h4 className="text-l md:text-2xl text-white font-semibold mb-3">
                      Request Information
                    </h4>
                    <form className="mb-2" onSubmit={handleFilterSubmit}>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col lg:flex-row gap-3">
                          <div className="flex-grow flex-shrink-0 basis-0">
                            <input
                              type="text"
                              className="w-full text-lg px-4 py-2 border border-gray-300 rounded-none shadow-sm"
                              placeholder="Firstname"
                            />
                          </div>
                          <div className="flex-grow flex-shrink-0 basis-0">
                            <input
                              type="text"
                              className="w-full text-lg px-4 py-2 border border-gray-300 rounded-none shadow-sm"
                              placeholder="Lastname"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-3">
                          <div className="flex-grow flex-shrink-0 basis-0">
                            <input
                              type="text"
                              className="w-full text-lg px-4 py-2 border border-gray-300 rounded-none shadow-sm"
                              placeholder="Email"
                            />
                          </div>
                          <div className="flex-grow flex-shrink-0 basis-0">
                            <input
                              type="text"
                              className="w-full text-lg px-4 py-2 border border-gray-300 rounded-none shadow-sm"
                              placeholder="Phone"
                            />
                          </div>
                        </div>

                        <div className="flex-grow flex-shrink-0 basis-0">
                          <select
                            value={selectedProgram}
                            onChange={(e) => {
                              console.log(
                                "Selected Program Change:",
                                e.target.value,
                              );
                              setSelectedProgram(e.target.value);
                            }}
                            className="w-full px-4 text-lg py-2 form-select rounded-none border border-gray-300 rounded-0
                             shadow-sm appearance-none"
                          >
                            <option defaultValue="">Program of Interest</option>
                            {programs.map((program, index) => (
                              <option key={index} value={program.program}>
                                {program.program}
                              </option>
                            ))}
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="text-white"
                          onClick={handleFilterSubmit}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            fill="currentColor" // Change "white" to "currentColor" for icon color
                            className="bi bi-arrow-right"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fillRule="evenodd"
                              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroRfi;
