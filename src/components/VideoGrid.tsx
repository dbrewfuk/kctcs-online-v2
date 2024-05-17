import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";

const videos = [
  {
    id: 1,
    title: "Jae Freeman",
    college: "West Kentucky Community & Technical College",
    program: "Criminal Justice",
    src: "https://demo.kctcs.edu/ko/media/jae.mp4", // Replace with your video URLs
  },
  {
    id: 2,
    title: "Drew Mckinney",
    college: "Ashland Community & Technical College",
    program: "Associate in Arts",
    src: "https://demo.kctcs.edu/ko/media/drew.mp4", // Replace with your video URLs
  },
  {
    id: 3,
    title: "Jae Freeman",
    college: "West Kentucky Community & Technical College",
    program: "Criminal Justice",
    src: "https://demo.kctcs.edu/ko/media/jae.mp4", // Replace with your video URLs
  },
  {
    id: 4,
    title: "Drew Mckinney",
    college: "Ashland Community & Technical College",
    program: "Associate in Arts",
    src: "https://demo.kctcs.edu/ko/media/drew.mp4", // Replace with your video URLs
  },
  {
    id: 5,
    title: "Jae Freeman",
    college: "West Kentucky Community & Technical College",
    program: "Criminal Justice",
    src: "https://demo.kctcs.edu/ko/media/jae.mp4", // Replace with your video URLs
  },
  {
    id: 6,
    title: "Drew Mckinney",
    college: "Ashland Community & Technical College",
    program: "Associate in Arts",
    src: "https://demo.kctcs.edu/ko/media/drew.mp4", // Replace with your video URLs
  },
];

function VideoGrid() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(
    [...new Array(videos.length)].map(() => true),
  );
  const [isFullscreen, setIsFullscreen] = useState(
    Array(videos.length).fill(false),
  );
  const [isHovered, setIsHovered] = useState(Array(videos.length).fill(false));
  const history = useHistory();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen((prevFullscreen) =>
        prevFullscreen.map((_, index) =>
          index === currentVideo
            ? !prevFullscreen[index]
            : prevFullscreen[index],
        ),
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [currentVideo]);

  const toggleFullscreen = (videoIndex) => {
    setIsFullscreen((prevFullscreen) =>
      prevFullscreen.map((value, index) =>
        index === videoIndex ? !value : value,
      ),
    );

    // Unmute and play the video when expanding
    if (!isFullscreen[videoIndex]) {
      const videoElement = document.getElementById(`video-${videoIndex}`);
      if (videoElement) {
        videoElement.muted = false;
        videoElement.play();
      }
    }
    // Pause the video when collapsing
    else {
      const videoElement = document.getElementById(`video-${videoIndex}`);
      if (videoElement) {
        videoElement.pause();
      }
    }
  };

  const handleProgramClick = (program) => {
    history.push(`/programs?search=${program}`);
    window.location.href = `/programs?search=${program}`;
  };

  const nextVideo = () => {
    setCurrentVideo((currentVideo + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((currentVideo - 1 + videos.length) % videos.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Fade up effect
      animate={{ opacity: 1, y: 0 }} // Fade up effect
      transition={{ duration: 0.25 }}
      className="pt-[80px] pb-[0px] lg:pt-[96px] lg:pb-[80px] transition-all ease-in-out duration-300"
    >
      <div className="container relative overflow-hidden px-8 lg:px-0 mx-auto">
        {/* Video Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px] gap-y-[48px] pb-[48px]">
          {videos.map((video, index) => (
            <div key={video.id}>
              <Suspense fallback={<div>Loading...</div>}>
                <div
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={`overflow-hidden ${
                    isFullscreen[index]
                      ? "m-[24px] fixed w-[calc(100%-48px)] h-[calc(100%-48px)] top-0 left-0 bg-white z-[1000]"
                      : "relative"
                  }`}
                >
                  {isFullscreen[index] && (
                    <button
                      onClick={() => toggleFullscreen(index)}
                      className="p-[12px] transform rotate-45 inline-block absolute transition-ease-in-out opacity-25 hover:opacity-100 duration-[200ms] group-hover:opacity-100 top-[16px] right-[16px]  text-white rounded-full z-[1000]"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 33 34"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.7792 0.904053L16.0287 0.90529L16.0287 16.1254L0.808594 16.1254L0.808594 17.8746H16.0287L16.0299 33.0959L17.7804 33.0947V17.8746H33.0005L32.9992 16.1266L17.7798 16.1272L17.7792 0.904053Z"
                          fill="white"
                        ></path>
                      </svg>
                    </button>
                  )}
                  {!isFullscreen[index] && (
                    <div className="absolute w-full h-full">
                      <div className="aspect-video absolute z-50 w-full top-[50%] transform translate-y-[-50%]">
                        {/* Video Player */}

                        <div className="group absolute w-[400px] h-[400px] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                          <button
                            onClick={() => toggleFullscreen(index)}
                            className="p-[12px] absolute top-[50%] transition-ease-in-out duration-[200ms] left-[50%] opacity-0 group-hover:opacity-100 transform translate-x-[-50%] translate-y-[-50%]  bg-[#E7A614] text-white rounded-full"
                          >
                            <svg
                              className="w-[32px] h-[32px] fill-white"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z"></path>
                              <path d="M0 0h24v24H0z" fill="none"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Video Player */}

                  <div className="aspect-w-16 aspect-h-9 bg-[#f5f5f5] rounded-[12px] overflow-hidden">
                    <video
                      id={`video-${index}`}
                      src={video.src}
                      className="object-cover w-full h-full object-center"
                      muted={isMuted[index]}
                      controls={isFullscreen[index]}
                    />
                  </div>
                </div>
              </Suspense>
              {!isFullscreen[index] && (
                <div className="text-[#00467F] mt-[16px]">
                  <div className="text-[24px] font-semibold mb-[4px] text-[#00467F]">
                    {video.title}
                  </div>
                  <div
                    className="text-[18px] cursor-pointer border-b-[2px] text-[#00467F] mb-[4px] inline-block font-[400]"
                    onClick={() => handleProgramClick(video.program)}
                  >
                    {video.program}
                  </div>
                  <div className="text-[18px] font-[400]">{video.college}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-full flex justify-end"></div>
      </div>
    </motion.div>
  );
}

export default VideoGrid;
