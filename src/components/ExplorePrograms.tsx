import React, { useState, useEffect } from "react";
import Search from "./Search";

function ExplorePrograms() {
  return (
    <div className="py-[64px] lg:pt-[80px] lg:pb-[72px] bg-[#005cb8] relative">
      <div className="container mx-auto px-[24px] lg:px-0">
        <div className="flex flex-col lg:flex-row items-end gap-[48px] lg:gap-[64px]">
          <div className="w-full lg:w-1/2">
            <h1 className="text-[48.8px] leading-[52px] lg:text-[61.04px] lg:leading-[64px] font-[800] text-white mb-[24px]">
              Something for <span className="">Everyone</span>
              <span className="dot">.</span>
            </h1>
            <p className="text-[20px] text-white font-semibold">
              We’ve been expanding our online offerings for years, and our
              programs are all designed to help you land an in-demand,
              high-paying job. So, what are you waiting for?
            </p>
          </div>
          <div className="w-full lg:w-1/2">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorePrograms;
