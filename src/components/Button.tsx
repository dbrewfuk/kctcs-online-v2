import React from "react";

function Button({ label, href, size, onClick, style }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`cursor-pointer rounded-full bg-[#00467F] text-[white] font-[600] border border-[#00467F] hover:bg-[white] whitespace-nowrap transition ease-in-out duration-[250] hover:text-[#00467F]  ${style === "flat" ? "border-b-[1px]" : ""} ${size === "small" ? "py-[8px] px-[24px] text-[14px] lg:py-[12px] lg:px-[32px] lg:text-[16px]" : "py-[12px] px-[32px] text-[16px] lg:py-[16px] lg:px-[48px] lg:text-[17.5px]"}`}
    >
      {label}
    </a>
  );
}

export default Button;
