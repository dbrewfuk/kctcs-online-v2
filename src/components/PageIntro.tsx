import React from "react";
import Search from "./Search";
import CollegeSelector from "./CollegeSelector";

function PageIntro({ title, supportingText }) {
  return (
    <div className="py-[64px] lg:py-[96px] bg-blue-900 relative">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row items-end gap-6">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-5">
              {title}
            </h1>
            <p className="text-xl lg:text-2xl text-white">{supportingText}</p>
            <CollegeSelector />
          </div>
          <div className="w-full lg:w-1/2">
            <Search />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-9 translate-y-full -translate-x-1/2 left-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="142"
          height="56"
          viewBox="0 0 142 71"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.578613 0L71 70.4214L141.421 0H0.578613Z"
            fill="color(srgb 0.1202 0.2262 0.5411)"
          />
        </svg>
      </div>
    </div>
  );
}
export default PageIntro;
