import React from "react";
import { useHistory } from "react-router-dom";

const InterestGrid = () => {
  const history = useHistory();
  const cardData = [
    { id: 1, image: "./assets/as1.jpeg", title: "Academics Support" },
    {
      id: 2,
      image: "./assets/as2.jpeg",
      title: "Advanced Manufacturing",
    },
    {
      id: 3,
      image: "./assets/as3.jpeg",
      title: "Allied Health",
    },
    {
      id: 4,
      image: "./assets/as4.jpeg",
      title: "Business, Computer, and Information Systems",
    },
    {
      id: 5,
      image: "./assets/as5.jpeg",
      title: "Communications, History, Languages, and Social Sciences",
    },
    {
      id: 6,
      image: "./assets/as6.jpeg",
      title: "Humanities",
    },
    {
      id: 7,
      image: "./assets/as7.jpeg",
      title: "Mathematics & Statistics",
    },
    {
      id: 8,
      image: "./assets/as8.jpeg",
      title: "Natural Sciences",
    },
    {
      id: 9,
      image: "./assets/as9.jpeg",
      title: "Nursing",
    },
    {
      id: 10,
      image: "./assets/as1.jpeg",
      title: "Skilled Trades",
    },
  ];

  const handleCardClick = (newFilterValue) => {
    history.push(`/programs?sector=${newFilterValue}`);
    window.location.href = `/programs?sector=${newFilterValue}`;
  };

  return (
    <div className="">
      <div className="flex flex-row flex-wrap">
        <div className="w-full md:w-1/2 bg-blue-900">
          <div className="p-8 py-[56px] lg:p-[96px] flex flex-col h-full justify-center">
            <h1 className="text-[48px] leading-[56px] lg:text-6xl text-white leading-[120%] font-extrabold mb-4">
              16 Colleges.{" "}
              <span className="text-[#fbbf24]">Unlimited Possibilities.</span>
            </h1>
            <p className="text-[20px] font-[600] leading-[32px] lg:text-xl text-white">
              Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis.
            </p>
          </div>
        </div>
        {cardData.map((card) => (
          <div
            className="w-1/2 lg:w-1/4 relative group transition ease-in-out cursor-pointer "
            key={card.id}
            onClick={() => handleCardClick(card.title)}
          >
            <div className="absolute z-30 flex flex-col w-full h-full justify-end p-[32px] hover:p-[22px] hover:border-[10px] hover:border-[#fbbf24]">
              <h1 className="text-3xl text-white font-semibold">
                {card.title}
              </h1>
            </div>
            <div className="absolute bg-blue-900 top-0 mix-blend-multiply w-full z-20 h-full opacity-50"></div>
            <div className="relative top-0 h-full w-full overflow-hidden z-10">
              <div className="aspect-square ease-in-out transition group-hover:scale-110 overflow-hidden">
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

export default InterestGrid;
