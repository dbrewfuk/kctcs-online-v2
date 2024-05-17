import React, { useEffect, useState } from "react";

const RfiModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div className="fixed z-[99] p-[24px] w-full h-full flex items-center justify-center">
      <div
        className="modal-overlay z-1 fixed inset-0 bg-black opacity-50"
        onClick={handleClose}
      ></div>
      <div className="modal-content relative w-full h-full z-10 bg-white flex flex-col lg:flex-row overflow-scroll">
        <div className="absolute top-0 right-0 p-[24px]">
          <button
            onClick={handleClose}
            className="text-[#00467F] font-bold text-[24px]"
          >
            <svg
              className="w-[24px] h-[24px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 27.436 27.436"
              fill="#00467F"
            >
              <path d="M1.414 0L0 1.416l12.303 12.303L0 26.022l1.414 1.414 12.303-12.303 12.305 12.303 1.414-1.416-12.303-12.303L27.436 1.414 26.022.002 13.72 12.305 1.414 0z"></path>
            </svg>
          </button>
        </div>
        <div className="relative w-full lg:w-[40%] h-[auto]">
          <div className="aspect-video w-full h-full">
            <img
              src="https://plus.unsplash.com/premium_photo-1683135221637-aa707fd349b6?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Placeholder"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full lg:w-[60%] flex flex-col justify-center py-[64px] px-[48px] lg:px-[64px] text-[#00467F]">
          <h2 className="text-2xl font-semibold mb-[32px] uppercase text-[#00467F]">
            Request Information
          </h2>
          <form className="w-full flex flex-col gap-[8px]">
            <label
              htmlFor="name"
              className="block font-[600] uppercase mb-[8px]"
            >
              <span className="block font-[600] uppercase mb-[4px]">
                First Name
              </span>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="flex w-full items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white"
              />
            </label>
            <label
              htmlFor="email"
              className="block mb-2 font-[600] uppercase mb-[8px]"
            >
              <span className="block font-[600] uppercase mb-[4px]">
                Last Name
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="flex w-full items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white"
              />
            </label>
            <label
              htmlFor="email"
              className="block mb-2 font-[600] uppercase mb-[8px]"
            >
              <span className="block font-[600] uppercase mb-[4px]">Phone</span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="flex w-full items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white"
              />
            </label>
            <label
              htmlFor="email"
              className="block mb-2 font-[600] uppercase mb-[8px]"
            >
              <span className="block font-[600] uppercase mb-[4px]">Email</span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="flex w-full items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white"
              />
            </label>
            <label
              htmlFor="email"
              className="block mb-2 font-[600] uppercase mb-[8px]"
            >
              <span className="block font-[600] uppercase mb-[4px]">
                College
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="flex w-full items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white"
              />
            </label>
            <label htmlFor="email" className="block mb-2 font-[600] uppercase">
              <span className="block font-[600] uppercase mb-[4px]">
                Program of Interest
              </span>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="flex w-full items-center text-[18px] py-[8px] pl-[12px] pr-[12px] text-[#00467F] justify-between border border-[#00467F] bg-white"
              />
            </label>
            <div className="flex w-full items-center justify-center mt-[48px]">
              <button
                type="submit"
                className="bg-[#00467F] font-[600] text-white text-[18px] py-[12px] px-[32px] rounded-full hover:bg-[white] hover:text-[#00467F] border-2 border-[#00467F] transition ease-in-out  duration-250"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RfiModal;
