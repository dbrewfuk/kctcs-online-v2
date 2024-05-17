import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ProgramResults from "./ProgramResults";
import ProgramResultCards from "./ProgramResultsCards";

const FeaturedAreasList2 = ({ handleProgramAreaClick, academicPlans }) => {
  const history = useHistory();

  const [uniquePlanNames, setUniquePlanNames] = useState([]);
  const [filteredAcademicPlans, setFilteredAcademicPlans] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState([]);

  const cardData = [
    {
      id: 1,
      image: "./assets/as1.jpeg",
      title: "Paralegal",
      content:
        "Become a vital part of the legal team by assisting lawyers, law offices, corporations and the courts to defend and prosecute the law, and administer justice.",
    },
    {
      id: 3,
      image: "./assets/as3.jpeg",
      title: "Criminal Justice",
      content:
        "Serve your community while promoting public safety. Our degree and certificate programs prepare for you for police, corrections, or security careers.",
    },
    {
      id: 4,
      image: "./assets/as4.jpeg",
      title: "Medical Information Technology",
      content:
        "Connect your people skills with technical know-how for administrative work in the medical field, including coding, transcription and billing. ",
    },
    {
      id: 5,
      image: "./assets/as5.jpeg",
      title: "Interdisciplinary Early Childhood Education",
      content:
        "Inspire a love of learning. You’ll learn about children's growth from birth through age five and prepare to work in preschools, Head Start programs or childcare centers.",
    },
    {
      id: 8,
      image: "./assets/as8.jpeg",
      title: "Human Services",
      content:
        "Affect change through meaningful work helping people in need. Our programs train you for careers in social, community, education and mental health services.",
    },
    {
      id: 9,
      image: "./assets/as4.jpeg",
      title: "Visual Communications Multimedia",
      content:
        "Learn the art of animation, audio/video production, web design and graphic design.",
    },
    {
      id: 12,
      image: "./assets/as2.jpeg",
      title: "Unmanned Systems Technology",
      content:
        "Soar to new heights in your career!  Drone technology is one of the fastest growing sectors of the economy. ",
    },
    {
      id: 13,
      image: "./assets/as1.jpeg",
      title: "Marine Technology",
      content:
        "Rock the boat with the technical training you need to advance as a professional mariner.",
    },
  ];

  const [selectedArea, setSelectedArea] = useState("Paralegal");

  useEffect(() => {
    // Filter the academic plans based on the search query, selected filters, etc.
    const filteredPlans = academicPlans.filter((plan) => {
      const matchesFilters = !selectedArea || plan.area === selectedArea;
      // Consider the selected sector filter

      return matchesFilters;
    });

    // Update the filtered academic plans state
    setFilteredAcademicPlans(filteredPlans);
  }, [selectedArea, selectedPlan, academicPlans]);

  return (
    <div className="">
      <div className="flex flex-row flex-wrap">
        {cardData.map((card) => (
          <div
            className={`w-full relative group lg:border-l-[2px] border-[#FBBF24] transition ease-in-out cursor-pointer ${
              selectedFilters.includes(card.title) ? "selected" : ""
            }`}
            key={card.id}
            onClick={() => {
              setSelectedArea(card.title);
              handleProgramAreaClick(card.title);
            }}
          >
            <div
              className={` flex flex-col transition-all lg:border-l-[4px] ease-in-out text-[#00467F] duration-[250ms] w-full h-full justify-center p-[20px]  ${selectedArea === card.title ? "bg-[#f5f5f5] border-[#FBBF24]" : " bg-[white] border-[transparent] hover:bg-[#f3f3f3]"}`}
            >
              <h1 className="text-[20px] whitespace-wrap font-semibold">
                {card.title}
              </h1>
              {selectedArea === card.title && (
                <>
                  <p className="text-[16px] text-[#00467F] mt-[8px] ">
                    {card.content}
                  </p>{" "}
                  <div className="lg:hidden mt-[24px]">
                    <ProgramResults
                      key={selectedArea}
                      filteredAcademicPlans={filteredAcademicPlans}
                      showCount={false}
                      darkBg={true}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedAreasList2;
