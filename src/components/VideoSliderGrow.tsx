import React, { useState, useEffect } from "react";

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
    program: "Criminal Justice",
    src: "https://demo.kctcs.edu/ko/media/drew.mp4", // Replace with your video URLs
  },
];

function VideoSliderGrow() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(
    [...new Array(videos.length)].map(() => true),
  );
  const [isFullscreen, setIsFullscreen] = useState(
    Array(videos.length).fill(false),
  );
  const [isHovered, setIsHovered] = useState(Array(videos.length).fill(false));

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
      prevFullscreen.map((_, index) =>
        index === videoIndex ? !prevFullscreen[index] : prevFullscreen[index],
      ),
    );

    // Unmute the currently expanded video when expanding
    if (!isFullscreen[videoIndex]) {
      const updatedMutedState = [...isMuted];
      updatedMutedState[videoIndex] = false;
      setIsMuted(updatedMutedState);
    }
    // Mute the currently expanded video when collapsing
    if (isFullscreen[videoIndex]) {
      const updatedMutedState = [...isMuted];
      updatedMutedState[videoIndex] = true;
      setIsMuted(updatedMutedState);
    }
  };

  const toggleMute = (videoIndex) => {
    const updatedMutedState = [...isMuted];
    if (isFullscreen[videoIndex]) {
      updatedMutedState[videoIndex] = false; // Unmute the video when in fullscreen
    } else {
      updatedMutedState[videoIndex] = !updatedMutedState[videoIndex]; // Toggle mute otherwise
    }
    setIsMuted(updatedMutedState);
  };

  const nextVideo = () => {
    setCurrentVideo((currentVideo + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((currentVideo - 1 + videos.length) % videos.length);
  };

  return (
    <div className="py-[64px] lg:py-[96px] transition-all ease-in-out duration-300">
      <div className="container relative overflow-hidden px-8 lg:px-0 mx-auto">
        <h1 className="text-6xl font-black text-blue-900 lg-[96px] mb-[48px]">
          Your Success Is Our Success
        </h1>

        {/* Video Content */}
        <div className="">
          <div className="flex w-full h-full top-0 gap-[16px] min-h-[400px] lg:min-h-[720px] transition-all">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className={`aspect-w-16 aspect-h-9 transition-width-ease-in-out duration-300 rounded-[25px] overflow-hidden ${
                  isHovered[index] ||
                  (index === 0 && !isHovered.some((hovered) => hovered))
                    ? "w-3/4"
                    : "w-1/4"
                } ${isFullscreen[index] ? "m-[24px] fixed w-[calc(100%-48px)] h-[calc(100%-48px)] top-0 left-0 bg-white z-[1000]" : "relative"}`}
                onMouseEnter={() =>
                  setIsHovered((prev) =>
                    prev.map((_, i) => (i === index ? true : false)),
                  )
                }
                onMouseLeave={() =>
                  setIsHovered((prev) =>
                    prev.map((_, i) => (i === index ? false : prev[i])),
                  )
                }
              >
                {/* Video Player */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="absolute z-10 inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <button
                      className="rounded-full p-[12px]"
                      onClick={() => toggleFullscreen(index)}
                    >
                      {isFullscreen[index] ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 32 32"
                          fill="none"
                        >
                          <path
                            d="M14.5889 16.1194H0.446777L0.446842 18.1276L12.1776 18.1206L1.15442 29.1438L2.56864 30.558L13.5918 19.5348L13.592 31.2585L15.5859 31.2586V17.1165C15.5852 16.8523 15.4798 16.5992 15.293 16.4124C15.1062 16.2256 14.8531 16.1202 14.5889 16.1194Z"
                            fill="none"
                          />
                          <path
                            d="M17.4118 15.2906L31.554 15.2906L31.5539 13.2824L19.8231 13.2894L30.8463 2.2662L29.4321 0.851989L18.4089 11.8752L18.4088 0.151463L16.4148 0.151398L16.4148 14.2935C16.4156 14.5577 16.5209 14.8109 16.7077 14.9976C16.8945 15.1845 17.1476 15.2898 17.4118 15.2906Z"
                            fill="none"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="48"
                          height="48"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M8 5v14l11-7z"></path>
                          <path d="M0 0h24v24H0z" fill="none"></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <video
                  src={video.src}
                  className="object-cover w-full h-full object-center"
                  autoPlay
                  muted={isMuted[index]}
                  loop
                  controls={isFullscreen[index]}
                />
                {!isFullscreen[index] && (
                  <div
                    className={`absolute bottom-0 p-[24px] w-full left-0 text-white whitespace-nowrap transition-all-ease-in-out duration-300 z-[90] ${isHovered[index] || (index === 0 && !isHovered.some((hovered) => hovered)) ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-[20px]"} z-90`}
                  >
                    <div className="flex flex-col lg:gap-[8px]">
                      <div className="text-lg lg:text-[32px] font-semibold text-[#fbbf24]">
                        {video.title}
                      </div>
                      <div className="text-sm lg:text-[20px] font-[600]">
                        {video.program}
                      </div>
                      <div className="text-[14px] lg:text-[20px] font-medium">
                        {video.college}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex py-2 gap-2">
            <button
              className="text-black p-3 rounded-full bg-white"
              onClick={prevVideo}
              disabled={currentVideo === 0}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 33"
                fill="none"
              >
                <path
                  d="M0.290002 17.1264L10.29 27.1264L11.71 25.7064L3.41 17.4164L32 17.4164L32 15.4164L3.41 15.4164L11.7 7.1264L10.29 5.7164L0.290002 15.7164C0.103751 15.9038 -0.000792498 16.1572 -0.000792521 16.4214C-0.000792544 16.6856 0.103751 16.939 0.290002 17.1264Z"
                  fill="#00467F"
                />
              </svg>
            </button>
            <button
              className="text-black p-3 rounded-full bg-white transform rotate-180"
              onClick={nextVideo}
              disabled={currentVideo === videos.length - 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 33"
                fill="none"
              >
                <path
                  d="M0.290002 17.1264L10.29 27.1264L11.71 25.7064L3.41 17.4164L32 17.4164L32 15.4164L3.41 15.4164L11.7 7.1264L10.29 5.7164L0.290002 15.7164C0.103751 15.9038 -0.000792498 16.1572 -0.000792521 16.4214C-0.000792544 16.6856 0.103751 16.939 0.290002 17.1264Z"
                  fill="#00467F"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoSliderGrow;
