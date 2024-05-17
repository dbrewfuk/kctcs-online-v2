import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const FeaturedAreas = ({ handleProgramAreaClick }) => {
  const [selectedArea, setSelectedArea] = useState("Paralegal");
  const history = useHistory();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const cardData = [
    { id: 1, image: "./assets/as1.jpeg", title: "Paralegal" },
    { id: 3, image: "./assets/as3.jpeg", title: "Criminal Justice" },
    {
      id: 4,
      image: "./assets/as4.jpeg",
      title: "Medical Information Technology",
    },
    {
      id: 5,
      image: "./assets/as5.jpeg",
      title: "Interdisciplinary Early Childhood Education",
    },
    { id: 8, image: "./assets/as8.jpeg", title: "Human Services" },
    {
      id: 9,
      image: "./assets/as4.jpeg",
      title: "Visual Communications Multimedia",
    },
    {
      id: 12,
      image: "./assets/as2.jpeg",
      title: "Unmanned Systems Technology",
    },
    { id: 13, image: "./assets/as1.jpeg", title: "Marine Technology" },
  ];

  return (
    <div className="">
      <div className="flex flex-row flex-wrap">
        {cardData.map((card) => (
          <div
            className={`w-1/2 relative group transition ease-in-out cursor-pointer ${
              selectedFilters.includes(card.title) ? "selected" : ""
            }`}
            key={card.id}
            onClick={() => {
              setSelectedArea(card.title);
              handleProgramAreaClick(card.title);
            }}
          >
            <div
              className={`absolute z-30 flex flex-col w-full h-full justify-center p-[24px] lg:p-[32px] hover:p-[22px] hover:border-[12px] hover:border-[#fbbf24] ${selectedArea === card.title ? "border-[12px] border-[#fbbf24]" : ""}`}
            >
              <h1
                className={`text-[24px] lg:text-3xl text-center text-[white] whitespace-wrap font-semibold ${selectedArea === card.title ? "pl-[24px]" : ""}`}
              >
                {card.title}
              </h1>
            </div>
            <div className="absolute bg-[#00467F] top-0  w-full z-20 h-full border-[white]"></div>
            <div className="relative top-0 h-full w-full overflow-hidden z-10">
              <div
                className={`aspect-[4/3] ease-in-out transition group-hover:scale-110 overflow-hidden ${selectedArea === card.title ? "scale-110" : "scale-100"} `}
              >
                <img
                  className="w-full h-full object-cover"
                  src={card.image}
                  alt="Placeholder"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAreas;
