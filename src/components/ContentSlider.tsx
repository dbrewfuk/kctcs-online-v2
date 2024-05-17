import React, { useState, useEffect } from "react";

function ContentSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const contentData = [
    {
      headline: "Nurse Practitioner",
      copy: "Unlike aspiring RNs, students in undergraduate BSN programs complete general education coursework and study advanced clinical knowledge. Nurse Practitioner. Unlike aspiring RNs, students in undergraduate BSN programs complete general education coursework and study advanced clinical knowledge",
      callToAction: ["Nurse Aide", "Nurse Assistant", "Registered Nurse"],
    },
    {
      headline: "Nurse's Aide",
      copy: "Unlike aspiring RNs, students in undergraduate BSN programs complete general education coursework and study advanced clinical knowledge. Nurse Practitioner. Unlike aspiring RNs, students in undergraduate BSN programs complete general education coursework and study advanced clinical knowledge",
      callToAction: ["Nurse Aide", "Nurse Assistant", "Registered Nurse"],
    },
    {
      headline: "Nurse Practitioner",
      copy: "Unlike aspiring RNs, students in undergraduate BSN programs complete general education coursework and study advanced clinical knowledge. Nurse Practitioner. Unlike aspiring RNs, students in undergraduate BSN programs complete general education coursework and study advanced clinical knowledge",
      callToAction: ["Nurse Aide", "Nurse Assistant", "Registered Nurse"],
    },
  ];

  const mediaData = [
    "https://plus.unsplash.com/premium_photo-1673958771843-12c73b278bd0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Media 1
    "https://plus.unsplash.com/premium_photo-1673958771843-12c73b278bd0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHxfA%3D%3D", // Media 2
    "https://plus.unsplash.com/premium_photo-1673958771843-12c73b278bd0?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Media 3
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []); // Empty dependency array to run only once

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === contentData.length - 1 ? 0 : prevIndex + 1,
      );
      setIsTransitioning(false);
    }, 300); // Adjust the timeout based on your transition duration
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? contentData.length - 1 : prevIndex - 1,
      );
      setIsTransitioning(false);
    }, 300); // Adjust the timeout based on your transition duration
  };

  return (
    <div className="flex flex-col lg:flex-row ">
      <div className="w-full order-2 lg:w-1/2 bg-[#f5f5f5] relative">
        <div className=" flex justify-end items-center gap-[12px] p-[24px] w-full lg:absolute">
          <div className="flex gap-[8px]">
            <button
              className="text-blue-500 p-[12px] bg-white rounded-full"
              onClick={handlePrev}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clipPath="url(#clip0_43_45)">
                  <path
                    d="M0.163126 9.39648L5.78813 15.0215L6.58687 14.2227L1.91813 9.55961L18 9.55961L18 8.43461L1.91813 8.43461L6.58125 3.77148L5.78813 2.97836L0.163127 8.60336C0.0583597 8.70875 -0.00044578 8.85132 -0.000445793 8.99992C-0.000445806 9.14852 0.0583596 9.29109 0.163126 9.39648Z"
                    fill="#00467F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_43_45">
                    <rect
                      width="18"
                      height="18"
                      fill="white"
                      transform="translate(18 18) rotate(-180)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>

            <button
              className="text-blue-500  p-[12px] bg-white rounded-full"
              onClick={handleNext}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <g clipPath="url(#clip0_46_100)">
                  <path
                    d="M17.8369 8.60352L12.2119 2.97852L11.4131 3.77727L16.0819 8.44039H0V9.56539H16.0819L11.4187 14.2285L12.2119 15.0216L17.8369 9.39664C17.9416 9.29125 18.0004 9.14868 18.0004 9.00008C18.0004 8.85147 17.9416 8.70891 17.8369 8.60352Z"
                    fill="#00467F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_46_100">
                    <rect width="18" height="18" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
        <div className="p-[24px] lg:p-[48px] flex flex-col justify-center h-full text-left">
          <h2 className="text-[#005CB8] text-[32px] font-bold mb-2">
            {contentData[currentIndex].headline}
          </h2>
          <p className="mb-[24px] text-[20px] text-[#005CB8]">
            {contentData[currentIndex].copy}
          </p>
          <div className="uppercase letter-tracking-[2px] font-semibold text-[#005CB8] mb-[16px]">
            Explore Programs
          </div>
          <div className="flex gap-[4px]">
            {contentData[currentIndex].callToAction.map((action, index) => (
              <button
                key={index}
                className="bg-[#005CB8] whitespace-nowrap text-ellipsis overflow-hidden hover:bg-blue-700 text-white font-bold py-[12px] px-[16px] text-[16px] leading-[16px] rounded-[8px] mr-2 mb-2"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full lg:order-2 lg:w-1/2 relative">
        <div className="progress-bars bottom-0">
          {contentData.map((_, index) => (
            <div
              key={index}
              className={`progress-bar ${currentIndex === index ? "active" : ""}`}
            />
          ))}
        </div>
        <div
          className={`aspect-square ${
            isTransitioning ? "fade-out" : "fade-in"
          }`}
        >
          <span className="absolute hidden bottom-0 right-0 p-[16px] text-white text-[16px]">
            {currentIndex + 1} / {contentData.length}
          </span>
          <img
            className="object-cover w-full h-full"
            src={mediaData[currentIndex]}
            alt={`Media ${currentIndex + 1}`}
          />
        </div>
      </div>
    </div>
  );
}

export default ContentSlider;
