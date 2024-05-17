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

function VideoSlider() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(
    [...new Array(videos.length)].map(() => true),
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen((prevFullscreen) => !prevFullscreen);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);

    // Unmute the currently expanded video when expanding
    if (!isFullscreen) {
      const updatedMutedState = [...isMuted];
      updatedMutedState[currentVideo] = false;
      setIsMuted(updatedMutedState);
    }
    // Mute the currently expanded video when collapsing
    if (isFullscreen) {
      const updatedMutedState = [...isMuted];
      updatedMutedState[currentVideo] = true;
      setIsMuted(updatedMutedState);
    }
  };

  const toggleMute = (videoIndex) => {
    const updatedMutedState = [...isMuted];
    if (isFullscreen) {
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
    <div
      className={`py-[64px] lg:py-[96px] transition-all ease-in-out duration-300 ${
        isFullscreen ? "fixed top-0 left-0 z-50 bg-white" : ""
      }`}
    >
      <div className="container relative overflow-hidden px-8 lg:px-0 mx-auto">
        <h1 className="text-6xl font-black text-blue-900 lg-[96px] mb-[48px]">
          Your Success Is Our Success
        </h1>

        <div
          className={`aspect-video aspect-w-16 aspect-h-9 ${
            isFullscreen
              ? "fixed w-screen transition-all ease-in-out duration-300 h-screen top-0 left-0 z-10 bg-white"
              : "relative w-3/4 "
          }`}
        >
          <div
            className={`w-full h-full flex absolute top-0 ${
              isFullscreen ? "gap-[0px]" : "gap-[24px]"
            }`}
            style={{
              transform: `translateX(-${currentVideo * (100 / videos.length)}%)`,
              transition: "transform 0.3s ease-in-out",
              display: "flex",
              width: `${videos.length * 100}%`,
            }}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                style={{
                  width: `calc(100% / ${videos.length})`,
                  position: "relative",
                }}
              >
                <div className="absolute w-full h-full">
                  <div className="aspect-video absolute z-50 w-full top-[50%] transform translate-y-[-50%]">
                    {/* Video Player */}
                    <div className="group absolute w-[400px] h-[400px] top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
                      <button
                        onClick={toggleFullscreen}
                        className="p-[12px] absolute top-[50%] transition-ease-in-out duration-[200ms] left-[50%] opacity-0 group-hover:opacity-100 transform translate-x-[-50%] translate-y-[-50%]  bg-white bg-opacity-20 hover:bg-opacity-70  text-white rounded-full"
                      >
                        {isFullscreen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 32 32"
                            fill="none"
                            className="w-[18px] h-[18px] lg:w-[24px] lg:h-[24px]"
                          >
                            <path
                              d="M14.5889 16.1194H0.446777L0.446842 18.1276L12.1776 18.1206L1.15442 29.1438L2.56864 30.558L13.5918 19.5348L13.592 31.2585L15.5859 31.2586V17.1165C15.5852 16.8523 15.4798 16.5992 15.293 16.4124C15.1062 16.2256 14.8531 16.1202 14.5889 16.1194Z"
                              fill="white"
                            />
                            <path
                              d="M17.4118 15.2906L31.554 15.2906L31.5539 13.2824L19.8231 13.2894L30.8463 2.2662L29.4321 0.851989L18.4089 11.8752L18.4088 0.151463L16.4148 0.151398L16.4148 14.2935C16.4156 14.5577 16.5209 14.8109 16.7077 14.9976C16.8945 15.1845 17.1476 15.2898 17.4118 15.2906Z"
                              fill="white"
                            />
                          </svg>
                        )}
                        {!isFullscreen && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z"></path>
                            <path d="M0 0h24v24H0z" fill="none"></path>
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
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
                <video
                  src={video.src}
                  className="w-full h-full cover"
                  autoPlay
                  muted={isMuted[index]}
                  loop
                  controls={isFullscreen}
                />
                {!isFullscreen && (
                  <div
                    className="absolute bottom-0 left-0 p-[8px] lg:p-[24px] text-white transition ease-in-out duration-300ms"
                    style={{ opacity: index === currentVideo ? 1 : 0 }}
                  >
                    <div className="text lg:text-[32px] text-amber-500 font-semibold">
                      {video.title}
                    </div>
                    <div className="text lg:text-[20px] font-semibold">
                      {video.program}
                    </div>
                    <div className="text lg:text-[20px] font-semibold">
                      {video.college}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex py-[16px] gap-[8px]">
            <button
              className="text-black p-[12px] rounded-full bg-white"
              onClick={prevVideo}
              disabled={currentVideo === 0}
              style={{ opacity: currentVideo === 0 ? 0.5 : 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 33"
                fill="none"
              >
                <g clipPath="url(#clip0_287_5028)">
                  <path
                    d="M0.290002 17.1264L10.29 27.1264L11.71 25.7064L3.41 17.4164L32 17.4164L32 15.4164L3.41 15.4164L11.7 7.1264L10.29 5.7164L0.290002 15.7164C0.103751 15.9038 -0.000792498 16.1572 -0.000792521 16.4214C-0.000792544 16.6856 0.103751 16.939 0.290002 17.1264Z"
                    fill="#00467F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_287_5028">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(32) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button
              className="text-black p-[12px] rounded-full bg-white"
              onClick={nextVideo}
              disabled={currentVideo === videos.length - 1}
              style={{ opacity: currentVideo === videos.length - 1 ? 0.5 : 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 33"
                fill="none"
              >
                <g clipPath="url(#clip1_287_5028)">
                  <path
                    d="M0.290002 17.1264L10.29 27.1264L11.71 25.7064L3.41 17.4164L32 17.4164L32 15.4164L3.41 15.4164L11.7 7.1264L10.29 5.7164L0.290002 15.7164C0.103751 15.9038 -0.000792498 16.1572 -0.000792521 16.4214C-0.000792544 16.6856 0.103751 16.939 0.290002 17.1264Z"
                    fill="#00467F"
                  />
                </g>
                <defs>
                  <clipPath id="clip1_287_5028">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(32) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isFullscreen && (
        <div className="w-full flex justify-end">
          <div className="flex py-[16px] gap-[8px]">
            <button
              className="text-black p-[12px] rounded-full bg-white"
              onClick={prevVideo}
              disabled={currentVideo === 0}
              style={{ opacity: currentVideo === 0 ? 0.5 : 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 33"
                fill="none"
              >
                <g clipPath="url(#clip0_287_5028)">
                  <path
                    d="M0.290002 17.1264L10.29 27.1264L11.71 25.7064L3.41 17.4164L32 17.4164L32 15.4164L3.41 15.4164L11.7 7.1264L10.29 5.7164L0.290002 15.7164C0.103751 15.9038 -0.000792498 16.1572 -0.000792521 16.4214C-0.000792544 16.6856 0.103751 16.939 0.290002 17.1264Z"
                    fill="#00467F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_287_5028">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(32) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button
              className="text-black p-[12px] rounded-full bg-white"
              onClick={nextVideo}
              disabled={currentVideo === videos.length - 1}
              style={{ opacity: currentVideo === videos.length - 1 ? 0.5 : 1 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 32 33"
                fill="none"
              >
                <g clipPath="url(#clip1_287_5028)">
                  <path
                    d="M0.290002 17.1264L10.29 27.1264L11.71 25.7064L3.41 17.4164L32 17.4164L32 15.4164L3.41 15.4164L11.7 7.1264L10.29 5.7164L0.290002 15.7164C0.103751 15.9038 -0.000792498 16.1572 -0.000792521 16.4214C-0.000792544 16.6856 0.103751 16.939 0.290002 17.1264Z"
                    fill="#00467F"
                  />
                </g>
                <defs>
                  <clipPath id="clip1_287_5028">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(32) rotate(90)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoSlider;
