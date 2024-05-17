import React, { useState, useEffect, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";

function Hero({ title, bgVideo, bgImage }) {
  const words = title.split(" ");

  // Extract unique credentials, program areas, and plan names

  return (
    <div className="bg-primary h-[400px] relative lg:h-[520px] overflow-hidden">
      <div className="w-full h-full">
        <div className="bg-[rgba(0,0,0,0.20)] absolute w-full h-full left-0 top-0 z-[1]"></div>
        <Suspense fallback={<div>Loading...</div>}>
          <iframe
            className="absolute top-[-100%] w-[220%] lg:w-[100%] left-[0] z-1 transform object-cover"
            src={
              bgVideo
                ? bgVideo
                : "https://player.vimeo.com/video/697035346?background=1&autoplay=1&loop=1&byline=0&title=0"
            }
            height="1366px"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
        </Suspense>
        <div className="absolute top-0 w-full h-full pb-[32px] z-[1]">
          <div className="container px-[24px] lg:px-0 mx-auto h-full">
            <div className="flex h-full items-end  justify-end">
              <div className="w-full lg:w-1/2 flex flex-col lg:pl-[32px]">
                <h1 className="text-[64px] leading-[64px] xl:text-[76px] text-[white] font-black mb-[32px]">
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
