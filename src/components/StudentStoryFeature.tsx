import React, { useRef, useState, useEffect, Suspense } from "react";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "./Button";
import ReactDOM from "react-dom"; // Import ReactDOM

const videos = [
  {
    id: 1,
    title: "Jae",
    college: "West Kentucky Community & Technical College",
    program: "Criminal Justice",
    src: "https://demo.kctcs.edu/ko/media/jae.mp4",
  },
  {
    id: 2,
    title: "Drew",
    college: "Your College Name",
    program: "Your Program Name",
    src: "https://demo.kctcs.edu/ko/media/drew.mp4",
  },
];

function StudentStoryFeature() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const history = useHistory();

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
    setIsFullscreen((prevFullscreen) => !prevFullscreen);

    // Unmute and play the video when expanding
    if (!isFullscreen) {
      const videoElement = document.getElementById(`video`);
      if (videoElement) {
        videoElement.muted = false;
        videoElement.play();
      }
    }
    // Pause the video when collapsing
    else {
      const videoElement = document.getElementById(`video`);
      if (videoElement) {
        videoElement.pause();
      }
    }
  };

  const handleProgramClick = (program) => {
    history.push(`/programs?search=${program}`);
    window.location.href = `/programs?search=${program}`;
  };

  const handleVideoTitleClick = (index) => {
    setCurrentVideo(index);
    setIsMuted(true); // Mute the video when changing the source
  };

  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef(null);

  const [isTextInView, setIsTextInView] = useState(false);

  // Your existing code...

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75 }}
      className="pt-[64px] pb-[48px] lg:pt-[128px] lg:pb-[96px]"
    >
      <div className="relative lg:container lg:mx-auto ">
        <div className="flex flex-col lg:flex-row items-center gap-[24px] lg:gap-[72px]">
          <div className="container mx-auto px-[24px] lg:px-0 w-full lg:w-[50%]">
            <h1 className="text-[48.8px] leading-[52px] lg:text-[61.04px] lg:leading-[64px] font-[800] text-[#00467F] lg-[96px] mb-[16px] lg:mb-[24px]">
              <span className="relative">
                <motion.span />
                Transform{" "}
              </span>
              Your Education
              <span className="dot">.</span>
            </h1>
            <p className="text-[18px] lg:text-[21px] lg:leading-[32px] leading-[28px] text-[#00467F] ">
              At KCTCS, we understand that every student has unique needs and
              goals. That's why we offer flexible scheduling options, including
              online and hybrid courses, to accommodate your busy lifestyle.
              Plus, our affordable tuition rates make it possible for you to
              pursue your dreams without breaking the bank.
            </p>
            <div className="flex gap-[8px] mt-[32px]">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="cursor-pointer w-full max-w-[220px] lg:w-auto"
                  onClick={() => handleVideoTitleClick(index)}
                >
                  <div
                    className={`flex flex-col  transition ease-in-out duration-[200ms]  gap-[8px] ${currentVideo === index ? "bg-[white]  hover:bg-[white]  " : "shadow-[0] "}`}
                  >
                    <div
                      className={`overflow-hidden aspect-video w-full  bg-[#f5f5f5] ${currentVideo === index ? "border-[#FBBF24] border-[6px] " : "shadow-[0] border-[0]"}`}
                    >
                      {" "}
                      <video
                        id={`video`}
                        src={video.src}
                        className="object-cover w-full h-full object-center"
                        muted={isMuted}
                        controls={isFullscreen}
                        autoPlay="autoplay"
                      />
                    </div>
                    <div className="text-[#00467F] text-[20px] font-[600] pb-[16px]">
                      {video.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video Content */}
          <div
            className="lg:w-[50%]"
            // Duration of the animation
          >
            <div key={videos[currentVideo].id} className="">
              {isFullscreen && (
                <div className="fixed top-0 left-0 w-full h-full z-[999] bg-[rgba(0,0,0,0.5)]"></div>
              )}
              <Suspense fallback={<div>Loading...</div>}>
                <div
                  className={` ${
                    isFullscreen
                      ? "m-[24px] fixed w-[calc(100%-48px)] h-auto lg:h-[calc(100%-24px)] top-0 left-0 z-[1000]"
                      : "relative "
                  }`}
                >
                  {isFullscreen && (
                    <div className="flex justify-end mb-[16px] lg:absolute top-0 right-0 lg:p-[24px]">
                      <div
                        className="flex items-center gap-[8px] cursor-pointer group"
                        onClick={toggleFullscreen}
                      >
                        <button className="p-[8px] group-hover:scale-[1.15] lg:p-[8px] transform rotate-45 inline-block transition-ease-in-out hover:opacity-100 duration-[200ms] group-hover:opacity-100 text-white rounded-full bg-[#FBBF24]">
                          <svg
                            className="lg:w-[18px] group-hover:scale-[1] lg:h-[18px] w-[16px] h-[16px] fill-white"
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
                        <span className="text-[11.7px] lg:text-[14px]  transition-ease-in-out duration-[200ms]   uppercase font-[600] tracking-[1px] text-[white]">
                          Close
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="aspect-w-16 aspect-h-9 rounded-[8px] bg-[#f5f5f5] overflow-hidden">
                    <video
                      id={`video`}
                      src={videos[currentVideo].src}
                      className="object-cover w-full h-full object-center"
                      muted={isMuted}
                      controls={isFullscreen}
                      autoPlay="autoplay"
                    />
                    {!isFullscreen && (
                      <>
                        <div
                          className="cursor-pointer group absolute w-full h-full top-0 left-0 z-[2]"
                          onClick={toggleFullscreen}
                        >
                          <div className="text-[#00467F] absolute flex w-full h-full items-center justify-center  p-[16px] z-[1]">
                            <div className="flex items-center gap-[8px] z-[2] group cursor-pointer">
                              <button className="w-[56px] h-[56px] flex items-center justify-center group-hover:scale-[1.095]  border-[white] transition-ease-in-out duration-[200ms] opacity-1 group-hover:opacity-100 bg-[] text-white bg-[#E7A614] rounded-full">
                                <svg
                                  className="w-[32px] group-hover:scale-[1] h-[32px] fill-white"
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
                      </>
                    )}
                  </div>
                </div>

                {!isFullscreen && <></>}
              </Suspense>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-[40px] lg:mt-[64px]">
          <Button
            label="Watch All Student Stories"
            href="/success-stories.aspx"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default StudentStoryFeature;
