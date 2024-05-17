import React, { useState } from "react";
import CollegeCards from "./CollegeCards";
import Button from "./Button";

function AdmissionsInfo() {
  const [selectedTab, setSelectedTab] = useState("");

  const tabs = [
    {
      name: "Degree Seeking",
      description:
        "KCTCS Online is dedicated to assisting you in advancing your educational aspirations through exceptional, adaptable, and cost-effective programs.",
      url: "",
      image: "./src/assets/admissions.jpeg",
      stat: "50+ Degree Plans",
    },
    {
      name: "Military",
      description:
        "KCTCS Online proudly supports our active military personnel, veterans, and their dependents by accepting Military Education benefits.",
      url: "https://kctcs.edu/education-training/military-veterans/index.aspx",
      image:
        "https://elizabethtown.kctcs.edu/education-training/media/images/military-veterans/veterans.jpg",
      stat: "",
    },
    {
      name: "Non-Degree Seeking",
      description:
        "Seeking professional development and skill enhancement opportunities without committing to a traditional degree program? Look no further — we've got you covered.",
      url: "",
      image: "./src/assets/admissions.jpeg",
      stat: "100+ Program Options",
    },
    // ... more options
  ];
  return (
    <>
      <div className="pt-[0px] lg:pb-[96px]">
        <div className="flex flex-col">
          <div className="relative w-full group overflow-hidden">
            <div className="container mx-auto px-[24px] lg:px-0 flex items-center mb-[40px] lg:mb-[52px] w-full">
              <h1 className="text-[48.8px] leading-[52px] whitespace-wrap w-[50%] lg:text-[61.04px] lg:leading-[64px] text-[#00467F] font-[800]">
                Let's Get&nbsp;
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
                Whether you’re a high school student, a returning student or
                just looking to take a class on the side, we are here for you.
                Pick a school to learn more about their admission requirements.
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
      <div className="relative px-[24px] w-full container mx-auto px-[24px] lg:px-0 pb-[64px] lg:pt-[56px] border-t-[1px] border-[#f0f0f0] lg:pb-[96px]">
        <div className="flex flex-row justify-center gap-[64px] w-full">
          <div className="flex w-full lg:w-[40%] flex-col order-2">
            <h3 className="text-[31px] leading-[36px] lg:text-[39px] leading-[44px] mb-[32px] font-[800] text-[#00467F]">
              Programs that fit your needs.
            </h3>

            <div className="flex flex-row flex-wrap">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full relative group lg:border-l-[2px] border-[#FBBF24] transition ease-in-out cursor-pointer `}
                  onClick={() => setSelectedTab(index)}
                >
                  <div
                    className={`flex flex-col transition-all ease-in-out text-[#00467F] duration-[250ms] w-full h-full justify-center p-[20px] ${selectedTab === index ? "lg:border-l-[6px] bg-[#f5f5f5] border-[#FBBF24]" : ""}`}
                  >
                    <h1 className="text-[20px] whitespace-wrap font-semibold">
                      {tab.name}
                    </h1>
                    {selectedTab === index && (
                      <div>
                        <p className="text-[16px] text-[#00467F] mt-[8px]">
                          {tab.description}
                        </p>
                        {tab.url && (
                          <div className="text-center lg:text-left mt-[24px]">
                            <a
                              href={tab.url}
                              className="w-full rounded-full text-[20px] flex gap-2 group items-center hover:transform transition inline-block transition ease-in-out text-center cursor-pointer width-auto text-[#00467F] py-3 font-semibold"
                            >
                              Learn More
                              <span className="group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition">
                                <svg
                                  className=""
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
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:w-[40%] lg:flex flex-row justify-center flex-wrap gap-[24px]">
            {tabs.map((item, index) => (
              <div
                className="flex w-[calc(50%-12px)] flex-row gap-[24px]  shadow-[0_4px_8px_1px_rgba(0,0,0,0.15)] rounded-[12px] overflow-hidden cursor-pointer"
                key={index}
              >
                <div
                  className={`aspect-[1/1] cursor-pointer w-full relative overflow-hidden transition ease-in-out duration-[250ms] ${selectedTab === index ? "bg-[#00467F] border-[#FBBF24] shadow-[0_4px_8px_1px_rgba(0,0,0,0.15)]" : "bg-[#FBBF24]"}`}
                  onClick={() => setSelectedTab(index)}
                >
                  <img
                    className={`w-full h-full object-cover transition ease-in-out duration-[250ms] absolute transform top-0 left-0 ${selectedTab === index ? "scale-[1.15]" : "scale-[1]"}`}
                    src={item.image}
                  />
                  <div className="absolute p-[24px] flex bottom-0 w-full">
                    {item.stat && (
                      <div
                        className={`p-[12px] rounded-[12px]  font-[600] text-[#00467F]" ${selectedTab === index ? "bg-[#005CB8] bg-opacity-[1] text-[white]" : "bg-[white] bg-opacity-[0.5] backdrop-blur-[20px] text-[white]"}`}
                      >
                        {item.stat}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>{" "}
        </div>
        <div className="flex justify-center mt-[48px]">
          <Button label="Explore Admissions" href="./admissions.aspx" />
        </div>
      </div>
    </>
  );
}

export default AdmissionsInfo;
