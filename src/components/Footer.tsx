import React, { useState, useEffect } from "react";

const Footer = ({ showModal, setShowModal }) => {
  const handleRequestButtonClick = () => {
    setShowModal(true);
  };
  return (
    <>
      <div className="bg-amber-400">
        <footer className="pt-[64px] lg:pt-[96px] pb-[64px] bg-amber-400">
          <div className="container mx-auto px-4">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col items-center gap-8 lg:mb-[64px]">
                <h1 className="text-[56px] lg:text-[76px] text-center text-[#00467F] font-black">
                  Start Your Journey Today.
                </h1>
                <div className="flex gap-2 items-center">
                  <div
                    className="bg-[#00467F] text-[17.5px] transition ease-in-out duration-[250ms] hover:bg-white cursor-pointer hover:text-[#00467F] border-[#00467F] border font-semibold text-white rounded-full py-[16px] px-[48px]"
                    onClick={handleRequestButtonClick}
                  >
                    Request Information
                  </div>
                  <div className="font-semibold text-[17.5px]  py-[16px] px-[48px] text-[#00467F]">
                    Explore Programs
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <a className="" href="/">
                  <img src="./assets/vertical-logo-dark.svg" alt="Logo" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
