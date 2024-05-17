import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom"; // For react-router-dom v5
import { collegeContent } from "./components/content.json"; // Make sure this path is correct
import Button from "./components/Button"; // Import Button component if it exists

const uniqueIndices = [0, 1, 2]; // Example unique indices
const imageDirectory = "./assets/"; // Replace with actual directory path
// List of image filenames
const imageFiles = [
  "as1.jpeg",
  "as2.jpeg",
  "as3.jpeg",
  "as4.jpeg",
  "as5.jpeg",
  "as6.jpeg",
  "as7.jpeg",
  "as8.jpeg",
  "as9.jpeg",
];
// Example image file names

const theme = "gray"; // Example theme

// Function to generate unique random indices
const generateUniqueRandomIndices = (count, maxIndex) => {
  const indices = new Set();
  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * maxIndex));
  }
  return Array.from(indices);
};

const firstSectionImages = generateUniqueRandomIndices(3, imageFiles.length);
const secondSectionImages = generateUniqueRandomIndices(3, imageFiles.length);

function DynamicSections({ title, supportingText, contentset }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("Select a College");
  const [contentFade, setContentFade] = useState(false); // State for content fade
  const history = useHistory();

  useEffect(() => {
    console.log("College Content:", collegeContent); // Debug log to check content
  }, []);

  const handleCollegeChange = (college) => {
    setContentFade(true); // Trigger fade out
    setTimeout(() => {
      setSelectedCollege(college);
      setShowOptions(false); // Close the options after selection (optional)
      setContentFade(false); // Trigger fade in after a delay
    }, 500); // Adjust according to your transition duration
    // Add any other logic you need based on the selected college
  };

  return (
    <div>
      <div className="relative">
        <div className="py-16 lg:py-24 bg-blue-900">
          <div className="container mx-auto px-8">
            <h1 className="text-6xl font-black text-white mb-5">{title}</h1>
            <p className="text-xl max-w-2xl text-white mb-8">
              {supportingText}
            </p>
            <div className="flex flex-row gap-4 lg:w-1/2">
              <div className="grow text-xl max-w-xs shrink-0 basis-0 text-ellipsis whitespace-nowrap dropdown-button">
                <div className="relative w-full inline-block">
                  <div
                    className={`w-full cursor-pointer border border-[#00467F] appearance-none py-3 px-8 font-semibold ${
                      selectedCollege !== "Select a College"
                        ? "bg-white text-[#00467F]"
                        : "text-white bg-[#00467F]"
                    }`}
                    onClick={() => setShowOptions(!showOptions)}
                  >
                    <div
                      className={`selected-option flex justify-between items-center ${
                        selectedCollege !== "Select a College" ? "selected" : ""
                      }`}
                    >
                      <span className="truncate max-w-[10em]">
                        {selectedCollege}
                      </span>
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
                        />
                      </svg>
                    </div>
                    {showOptions && (
                      <div className="absolute max-w-[720px] m-auto z-[20] mt-2 w-full left-[50%] transform translate-x-[-50%] rounded-[12px] p-[24px] shadow-lg bg-white  ring-1 ring-black ring-opacity-5">
                        <div className=" flex flex-wrap">
                          {Object.keys(collegeContent).map((college) => (
                            <div
                              key={college}
                              className="text-[16px] w-[50%] text-[#00467F] font-[600] cursor-pointer hover:bg-gray-100 rounded-[4px] group flex items-center px-[16px] py-[8px]"
                              onClick={() => handleCollegeChange(college)}
                            >
                              {college}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 z-10 translate-y-full -translate-x-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="142"
            height="56"
            viewBox="0 0 142 71"
            fill="#005CB8"
            className="fill-blue-900"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.578613 0L71 70.4214L141.421 0H0.578613Z"
              fill="#005CB8"
            />
          </svg>
        </div>
      </div>

      {selectedCollege !== "Select a College" && (
        <div className={`fade-${contentFade ? "out" : "in"}`}>
          <div className="flex flex-col">
            {collegeContent[selectedCollege]?.[contentset]
              ?.slice(0, 3)
              .map((section, sectionIndex) => {
                const imageIndex = firstSectionImages[sectionIndex];

                const imageUrl = imageDirectory + "/" + imageFiles[imageIndex];
                return (
                  <div className="w-full" key={sectionIndex}>
                    <div className="flex flex-col lg:flex-row">
                      <div
                        className={`${
                          sectionIndex % 2 === 0
                            ? "w-full lg:w-1/2 lg:order-2"
                            : "w-full lg:w-1/2"
                        }`}
                      >
                        <div className="aspect-square">
                          <img
                            className="w-full h-full object-cover"
                            src={imageUrl}
                            alt={section.title}
                          />
                        </div>
                      </div>
                      <a className="w-full lg:w-1/2 group" href={section.url}>
                        <div className="p-[24px] lg:py-16 lg:pl-24 lg:pr-24 flex flex-col gap-[32px] h-full justify-center align-items-center">
                          <h1 className="text-[48px] leading-snug lg:text-[61.04px] font-extrabold text-[#00467F] mb-4">
                            {section.title}
                          </h1>
                          <p className="text-[48px] leading-[52px] lg:text-[61.04px] lg:leading-[64px] text-[#00467F]">
                            {section.content}
                          </p>
                          <div className="text-center lg:text-left">
                            <a className="w-full rounded-full text-[20px] flex gap-2 items-center hover:transform transition inline-block transition ease-in-out text-center cursor-pointer width-auto text-[#00467F] font-semibold">
                              Learn More
                              <span className="group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  fill="currentColor"
                                  className="bi bi-arrow-right"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                  ></path>
                                </svg>
                              </span>
                            </a>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="bg-[#f5f5f5]">
            <div className="px-[24px] py-[56px] lg:py-[80px]  lg:px-0 lg:container mx-auto snap-x overflow-x-auto flex gap-8">
              {collegeContent[selectedCollege]?.[contentset]
                .slice(3, 6)
                ?.map((section, sectionIndex) => {
                  // Get a unique index for each section
                  const imageIndex = secondSectionImages[sectionIndex];
                  // Construct the URL of the image
                  const imageUrl =
                    imageDirectory + "/" + imageFiles[imageIndex];
                  return (
                    <a
                      href={section.url}
                      className="group min-w-[320px] snap-center lg:w-[33%] flex flex-col"
                      key={sectionIndex}
                    >
                      <div className="">
                        <div className="aspect-square w-full overflow-hidden">
                          <img
                            className="group-hover:scale-115 transition ease-in-out duration-250 w-full h-full object-cover"
                            src={imageUrl}
                            alt={section.title}
                          />
                        </div>
                      </div>
                      <div
                        className={`w-full p-[32px] ${
                          theme === "gray" ? "bg-[white]" : "bg-[#f5f5f5]"
                        }`}
                      >
                        <div className="flex flex-col  gap-[32px] h-full justify-center align-items-center">
                          <h1 className="text-[25px] font-[600] text-[#00467F]">
                            {section.title}
                          </h1>
                          <p className="text-lg text-[#00467F]">
                            {section.content}
                          </p>
                          <div className="text-center lg:text-left">
                            <div className="w-full rounded-full text-[20px] flex gap-[8px] group items-center hover:transform transition inline-block transition ease-in-out text-center cursor-pointer width-auto text-[#00467F] font-semibold">
                              Learn More
                              <span className="group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="32"
                                  height="32"
                                  fill="currentColor"
                                  className="bi bi-arrow-right"
                                  viewBox="0 0 16 16"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                                  ></path>
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
            </div>
          </div>
          <div className="py-[56px] lg:py-[80px] ">
            <div className="px-[24px] lg:px-0 container mx-auto">
              <div className="w-full flex flex-wrap gap-x-6 [&>:first-child]:border-t-2  [&>:nth-child(2)]:border-t-2 lg:[&>:nth-child(3)]:border-t-2 justify-center">
                {collegeContent[selectedCollege]?.[contentset]?.slice(6).map(
                  (item, itemIndex) =>
                    item.title &&
                    item.url && (
                      <div
                        className="w-[calc(50%-12px)] lg:w-[calc(33%-12px)] flex items-center border-b-2 border-[#FBBF24]"
                        key={itemIndex}
                      >
                        <a
                          className="font-semibold border-0 relative py-5 flex w-full group text-[#00467F] uppercase tracking-wide text-[17.5px]"
                          href={item.url}
                        >
                          <span className="transform transition pr-8 ease-in-out duration-250 group-hover:translate-x-5">
                            {item.title}
                          </span>
                          <span className="w-8 absolute right-0 opacity-0 h-6 transform -translate-x-10 group-hover:translate-x-0 transition ease-in-out duration-250 group-hover:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 32 32"
                              fill="#00467f"
                            >
                              <path d="M31.71 15.295l-10-10-1.42 1.42 8.3 8.29H0v2h28.59l-8.29 8.29 1.41 1.41 10-10a1 1 0 000-1.41z" />
                            </svg>
                          </span>
                        </a>
                      </div>
                    ),
                )}
              </div>
            </div>
            <div className="flex justify-center mt-12">
              <Button
                label="Learn More"
                size=""
                href={
                  collegeContent[selectedCollege]?.[contentset]?.slice(-1)?.[0]
                    ?.source_page || "#"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DynamicSections;
