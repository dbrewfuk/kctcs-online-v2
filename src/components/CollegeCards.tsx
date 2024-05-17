import React, { useState } from "react";
import Button from "./Button";
import { collegeContent } from "./content.json";
import { motion, AnimatePresence } from "framer-motion";

function CollegeCards({ contentset, theme }) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("Select a College");
  const [selectedCollegeVideo, setSelectedCollegeVideo] = useState("");

  const [contentFade, setContentFade] = useState(false); // State for content fade
  const handleCollegeChange = (college) => {
    setIsVisible(true);
    setSelectedCollege(college);
    const selectedCollegeVideoUrl =
      collegeVideos.find((collegeVideo) => collegeVideo.id === college)
        ?.videoUrl || "";
    console.log("Selected College:", college);
    console.log("Selected College Video URL:", selectedCollegeVideoUrl);
    setSelectedCollegeVideo(selectedCollegeVideoUrl);
    setShowOptions(false); // Close the options after selection (optional)
    setContentFade(false); // Trigger fade in after a delay
  };
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Define the directory containing the images
  const imageDirectory = "./src/assets/";

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

  // Function to generate unique random indices
  const generateUniqueRandomIndices = (count, maxIndex) => {
    const indices = new Set();
    while (indices.size < count) {
      indices.add(Math.floor(Math.random() * maxIndex));
    }
    return Array.from(indices);
  };

  // Generate unique random indices for the images
  const uniqueIndices = generateUniqueRandomIndices(
    imageFiles.length,
    imageFiles.length,
  );

  const collegeVideos = [
    {
      id: "Bluegrass",
      videoUrl:
        "https://player.vimeo.com/video/665275644?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Big Sandy",
      videoUrl:
        "https://player.vimeo.com/video/866906277?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Elizabethtown",
      videoUrl:
        "https://player.vimeo.com/video/665254350?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Gateway",
      videoUrl:
        "https://player.vimeo.com/video/665332368?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Hazard",
      videoUrl:
        "https://player.vimeo.com/video/695733709?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Henderson",
      videoUrl:
        "https://player.vimeo.com/video/695721251?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Hopkinsville",
      videoUrl:
        "https://player.vimeo.com/video/695722705?background=1&autoplay=1&loop=1&byline=0&title=0",
    },
    {
      id: "Jefferson",
      videoUrl:
        "https://player.vimeo.com/video/665333065?background=1&autoplay=1&loop=1&byline=0&title=0",
    },

    // more colleges
  ];

  const sourcePage = collegeContent[selectedCollege]?.[contentset]?.source_page;

  return (
    <>
      <div
        className={`flex flex-col gap-[64px] pb-[96px] ${theme === "gray" ? "bg-[#fafafa] lg:pt-[80px]" : "bg-[white]"}`}
      >
        <div className={`${theme === "gray" ? "bg-[#fafafa]" : "bg-[white]"}`}>
          <div className="lg:container lg:mx-auto">
            <div className="flex flex-col gap-[32px] justify-center w-full">
              <div className="w-full relative px-[32px] py-[80px] overflow-hidden rounded-[0px] lg:rounded-[16px]">
                <h1 className="text-[39.06px] z-[2] relative leading-[40px] font-[800] text-[white] mb-[24px] text-center">
                  16 Colleges. <span className="">Unlimited Possibilities</span>
                  <span className="">.</span>
                </h1>

                <div className="bg-[rgba(0,0,0,0.20)] absolute w-full h-full left-0 top-0 z-[1]"></div>
                <iframe
                  className="absolute top-[-150%] left-[0] z-1 transform object-cover"
                  src={
                    selectedCollegeVideo
                      ? selectedCollegeVideo
                      : "https://player.vimeo.com/video/697035346?background=1&autoplay=1&loop=1&byline=0&title=0"
                  }
                  width="2000px"
                  height="1366px"
                  frameBorder="0"
                  allow="autoplay; fullscreen"
                  allowfullscreen
                ></iframe>

                <div className="flex justify-center relative z-[2]">
                  <div className="relative">
                    <div
                      className={`cursor-pointer  text-[17.5px] font-[600] rounded-full bg-[white] bg-opacity-[15%] hover:bg-opacity-[30%] transition ease-in-out duration-[250] backdrop-blur-[20px] appearance-none py-[16px] pl-[32px] pr-[24px] ${
                        selectedCollege ? "text-[white]" : "text-white "
                      }`}
                      onClick={() => setShowOptions(!showOptions)}
                    >
                      <div
                        className={`selected-option flex gap-[8px] justify-between items-center ${
                          selectedCollege ? "selected" : ""
                        }`}
                      >
                        <span className="truncate max-w-[10em]">
                          {selectedCollege || "Select a College"}
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#fff"
                          >
                            <path d="M480-371.69 267.69-584 296-612.31l184 184 184-184L692.31-584 480-371.69Z" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showOptions && (
          <div className="absolute max-w-[720px] m-auto z-10 mt-2 w-full left-[50%] transform translate-x-[-50%] rounded-[12px] p-[24px] shadow-lg bg-white bg-opacity-[70%] backdrop-blur-[20px] ring-1 ring-black ring-opacity-5">
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
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.25 }}
            >
              {selectedCollege !== "Select a College" && (
                <>
                  <div className="px-[24px] lg:px-[0] lg:container mx-auto snap-x overflow-x-auto flex gap-[32px]">
                    {collegeContent[selectedCollege]?.[contentset]
                      .slice(0, 3)
                      ?.map((section, sectionIndex) => {
                        // Get a unique index for each section
                        const imageIndex =
                          uniqueIndices[sectionIndex % uniqueIndices.length];
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
                              <div className="aspect-[4/3] w-full overflow-hidden">
                                <img
                                  className="group-hover:scale-[1.15] transition ease-in-out duration-[250ms] w-full h-full object-cover"
                                  src={imageUrl}
                                  alt={section.title}
                                />
                              </div>
                            </div>
                            <div
                              className={`w-full p-[32px] ${theme === "gray" ? "bg-[white]" : "bg-[#f5f5f5]"}`}
                            >
                              <div className="flex flex-col h-full justify-center align-items-center">
                                <h1 className="text-[24px] font-[600] text-[#00467F] mb-4">
                                  {section.title}
                                </h1>
                                <p className="text-[18px] text-[#00467F]">
                                  {section.content}
                                </p>
                                <div className="text-center lg:text-left">
                                  <div className="w-full rounded-full text-[20px] flex gap-2 group items-center hover:transform transition inline-block transition ease-in-out text-center cursor-pointer width-auto text-[#00467F] py-3 font-semibold">
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

                  <div className="px-[24px] lg:px-[0] container mx-auto mt-[64px]">
                    <div className="w-full flex flex-wrap gap-x-[24px] [&>:first-child]:border-t-[2px]  [&>:nth-child(2)]:border-t-[2px] lg:[&>:nth-child(3)]:border-t-[2px] justify-center">
                      {collegeContent[selectedCollege]?.[contentset]
                        ?.slice(3)
                        .map(
                          (item, itemIndex) =>
                            item.title &&
                            item.url && (
                              <div
                                className="w-[calc(50%-12px)] lg:w-[calc(33%-12px)] flex items-center border-b-[2px] border-[#FBBF24]"
                                key={itemIndex}
                              >
                                <a
                                  className="font-[600] border-[0] relative py-[20px] flex w-full group text-[#00467F] uppercase tracking-[0.35px] text-[17.5px]"
                                  href={item.url}
                                >
                                  <span className="transform transition pr-[32px]  ease-in-out duration-[250ms] group-hover:translate-x-[20px] ">
                                    {item.title}
                                  </span>
                                  <span className="w-[32px] absolute right-0 opacity-[0%] h-[24px] transform translate-x-[-40px] group-hover:translate-x-[0] transition ease-in-out duration-[250ms] group-hover:opacity-[100%]">
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
                  <div className="flex justify-center mt-[48px]">
                    <Button
                      label="Learn More"
                      size=""
                      href={
                        collegeContent[selectedCollege]?.[contentset]?.slice(
                          -1,
                        )?.[0]?.source_page || "#"
                      }
                    />
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CollegeCards;
