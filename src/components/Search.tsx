import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Search = () => {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [showInputLabel, setShowInputLabel] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    history.push(`/programs?search=${searchQuery}`);
  };

  const handlePopularSearchClick = (popularSearch: string) => {
    setSearchQuery(popularSearch);
  };

  return (
    <div>
      <h3 className="text-[20px] flex font-semibold text-white mb-[12px]">
        <span>Explore Online Programs</span>
      </h3>
      <div className="relative w-full mb-[24px]">
        {showInputLabel && (
          <div className="input-label font-semibold uppercase text-[#00467F] mb-2">
            Keyword Search
          </div>
        )}

        <form onSubmit={handleSubmit} className="">
          <div className="flex items-center gap-[24px] text-[18px] relative overflow-hidden">
            <span className="absolute w-[24px] ml-[12px] left-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 29.811 29.811"
                alt="search"
                fill="#00467F"
              >
                <path d="M14.884 2.25A10.5 10.5 0 009.62 3.67a10.49 10.49 0 00-4.921 6.414A10.493 10.493 0 005.754 18.1c2.735 4.738 8.613 6.556 13.496 4.344l1.82-1.05a10.476 10.476 0 004.034-5.842c.73-2.725.356-5.572-1.055-8.015s-3.688-4.19-6.414-4.922a10.66 10.66 0 00-2.751-.364zm8.606 27.561l-3.121-5.406c-5.962 2.817-13.21.626-16.563-5.18-3.533-6.12-1.43-13.97 4.689-17.504a12.74 12.74 0 019.723-1.28 12.727 12.727 0 017.779 5.97 12.73 12.73 0 011.28 9.723 12.717 12.717 0 01-4.965 7.137l3.126 5.415z"></path>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search programs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-[16px] leading-[24px] pl-[48px] py-[12px] border border-[#00467F] text-[#00467F] w-full"
            />

            <span className="absolute h-full flex items-center gap-[16px] right-0 top-0 text-white transition-all duration-300 hover:bg-opacity-80 focus:outline-none">
              <span
                className={`w-[18px] h-[18px] transition ease-in-out  duration-200 cursor-pointer ${searchQuery ? "opacity-100" : "opacity-0"}`}
                onClick={() => setSearchQuery("")} // Clear search query
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 27.436 27.436"
                  fill="#00467F"
                >
                  <path d="M1.414 0L0 1.416l12.303 12.303L0 26.022l1.414 1.414 12.303-12.303 12.305 12.303 1.414-1.416-12.303-12.303L27.436 1.414 26.022.002 13.72 12.305 1.414 0z"></path>
                </svg>
              </span>
              <span
                className={`p-[8px] mr-[8px] rounded-[12px] bg-[#FBBF24] cursor-pointer hover:bg-opacity-70 transition ease-in-out  duration-200 cursor-pointer ${searchQuery ? "transform translate-x-[0px]" : "translate-x-[50px]"}`}
                onClick={handleSubmit} // Clear search query
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#00467F"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  ></path>
                </svg>
              </span>
            </span>
          </div>
        </form>
      </div>

      {/* Popular Searches Section */}
      <div className="flex flex-row flex-col gap-[8px] lg:gap-[12px]">
        <h4 className="text-[16px] text-white font-semibold">
          Popular Searches
        </h4>
        <ul className="text-white text-[16px] flex gap-[8px] flex-wrap">
          <li
            className="whitespace-nowrap text-ellipsis overflow-hidden rounded-[3px] px-[16px] py-[8px] font-semibold bg-[#00467F] cursor-pointer"
            onClick={() => handlePopularSearchClick("Public Leadership")}
          >
            Public Leadership
          </li>
          <li
            className="whitespace-nowrap text-ellipsis overflow-hidden rounded-[3px] px-[16px] py-[8px] font-semibold bg-[#00467F]  cursor-pointer"
            onClick={() => handlePopularSearchClick("Web Design")}
          >
            Web Design
          </li>
          <li
            className="whitespace-nowrap text-ellipsis overflow-hidden rounded-[3px] px-[16px] py-[8px] font-semibold bg-[#00467F]  cursor-pointer"
            onClick={() => handlePopularSearchClick("Marine Culinary")}
          >
            Marine Culinary
          </li>
          {/* Add more popular searches as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Search;
