import React, { useState } from "react";

function AdmissionsInfo() {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      name: "Degree Seeking",
      description:
        "KCTCS Online is dedicated to assisting you in advancing your educational aspirations through exceptional, adaptable, and cost-effective programs.",
      url: "",
    },
    {
      name: "Military",
      description:
        "KCTCS Online proudly supports our active military personnel, veterans, and their dependents by accepting Military Education benefits.",
      url: "",
    },
    {
      name: "Non-Degree Seeking",
      description:
        "Seeking professional development and skill enhancement opportunities without committing to a traditional degree program? Look no further — we've got you covered.",
      url: "",
    },
    // Additional slides
  ];

  const handleSlideChange = (increment) => {
    const newIndex = slideIndex + increment;
    if (newIndex >= 0 && newIndex < slides.length) {
      setSlideIndex(newIndex);
    } else if (newIndex < 0) {
      setSlideIndex(slides.length - 1);
    } else {
      setSlideIndex(0);
    }
  };

  return (
    <>
      {/* Your existing JSX code... */}
      <div className="relative w-full mx-auto lg:px-0 pb-[64px] lg:pt-[0] lg:pb-[96px]">
        <div className="flex flex-row justify-center items-center gap-[64px] w-full overflow-hidden">
          <button
            onClick={() => handleSlideChange(-1)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            &lt;
          </button>
          <div className="flex w-full lg:w-[300vw] overflow-x-scroll">
            <div className="flex justify-between w-[100%]">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`w-full ${index === slideIndex ? "" : "hidden"}`}
                >
                  <div className="pt-[0px] lg:pt-[80px] lg:pb-[96px]">
                    <div className="flex flex-col">
                      <div className="relative w-full group overflow-hidden">
                        <div className="container mx-auto px-[24px] lg:px-0 flex items-center mb-[40px] lg:mb-[52px] w-full">
                          <h1 className="text-[48.8px] leading-[52px] whitespace-wrap w-[50%] lg:text-[61.04px] lg:leading-[64px] text-[#00467F] font-[800]">
                            {slide.name}
                            <span className="">
                              <span className="bar"> Started</span>
                              <span className="dot">.</span>
                            </span>
                          </h1>
                          <div className="absolute right-[24px] z-[-1] lg:relative w-[50%] flex justify-center"></div>
                        </div>
                      </div>
                      <div className="flex flex-col lg:flex-row items-center w-full">
                        <div className="w-full lg:w-[50%] h-full relative z-1 aspect-[16/9] overflow-hidden lg:rounded-tr-[12px] lg:rounded-br-[12px]">
                          <img
                            className="w-full group-hover:scale-110 transition ease-in-out duration-[250ms] h-full absolute z-1 object-cover"
                            src="./src/assets/admissions.jpeg"
                          />
                        </div>
                        <div className="p-[24px] pt-[48px] lg:pt-[56px] py-[48px] lg:pb-[72px] lg:pl-[64px] max-w-[596px]">
                          <p className="text-[25px] font-[600] text-[#00467F]">
                            {slide.description}
                          </p>
                          <div className="w-full text-center">
                            <a
                              href="/admissions.aspx"
                              className="text-[17.5px] mt-[32px] lg:mt-[48px] rounded-full border inline-block transition ease-in-out text-center cursor-pointer width-auto bg-[#00467F] text-white py-[16px] font-semibold px-[48px] hover:bg-white hover:text-[#00467F] hover:border-[#00467F]"
                            >
                              Get Started
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => handleSlideChange(1)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg"
          >
            &gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default AdmissionsInfo;
