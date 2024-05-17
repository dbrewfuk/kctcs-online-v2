import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const FeaturedAreasList = ({ handleProgramAreaClick }) => {
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

  // Set to the title of the first card

  return (
    <div className="">
      <div className="flex flex-row flex-wrap">
        {cardData.map((card) => (
          <div
            className={`w-full relative group transition ease-in-out cursor-pointer ${
              selectedFilters.includes(card.title) ? "selected" : ""
            }`}
            key={card.id}
            onClick={() => {
              setSelectedArea(card.title);
              handleProgramAreaClick(card.title);
            }}
          >
            <div
              className={` flex flex-col transition-all ease-in-out duration-200 w-full h-full justify-center p-[16px] border-l-[4px] border-b-[1px] border-b-[#f3f3f3] hover:border-l-[#fbbf24]  ${selectedArea === card.title ? "border-l-[4px] border-l-[#fbbf24] pl-[24px]" : " border-l-[white] "}`}
            >
              <h1 className="text-[24px] text-[#00467F] whitespace-wrap font-semibold">
                {card.title}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAreasList;
