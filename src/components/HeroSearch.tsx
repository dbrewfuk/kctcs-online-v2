import React, { useState, useEffect, Suspense } from "react";
import { useHistory, useLocation } from "react-router-dom";
import programs from "../programs-20240207.json";
import Filters from "./Filters";

function HeroSearch({
  title,
  highlighted,
  uniqueCredentialTypes,
  setUniqueCredentialTypes,
}) {
  const history = useHistory();
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedCredentialTypes, setSelectedCredentialTypes] = useState([]);
  const [uniqueCredentials, setUniqueCredentials] = useState([]);
  const [uniqueSectors, setUniqueSectors] = useState([]);
  const [selectedSector, setSelectedSector] = useState([]);
  const [uniqueProgramAreas, setUniqueProgramAreas] = useState([]);
  const [uniquePlanNames, setUniquePlanNames] = useState([]);
  const words = title.split(" ");

  const handleCredentialTypeChange = (e, credentialType) => {
    // Check if the credential type is already selected
    const isSelected = selectedCredentialTypes.includes(credentialType);

    // If the credential type is already selected, remove it from the selected types
    // If not selected, add it to the selected types
    if (isSelected) {
      setSelectedCredentialTypes((prevSelectedTypes) =>
        prevSelectedTypes.filter((type) => type !== credentialType),
      );
    } else {
      setSelectedCredentialTypes((prevSelectedTypes) => [
        ...prevSelectedTypes,
        credentialType,
      ]);
    }
  };

  const highlightedTitle = words.map((word, index) => {
    if (word.toLowerCase() === highlighted.toLowerCase()) {
      return (
        <span className="text-[#FBBF24]" key={index}>
          {word}{" "}
        </span>
      );
    } else {
      return <span key={index}>{word} </span>;
    }
  });

  useEffect(() => {
    // Extract unique credentials, program areas, and plan names
    const credentials = new Set();
    const programAreas = new Set();
    const planNames = new Set();
    const sectors = new Set();

    programs.forEach((program) => {
      program.colleges.forEach((college) => {
        if (college.academic_plans && college.academic_plans.length > 0) {
          college.academic_plans.forEach((plan) => {
            credentials.add(plan.credentials_awarded);
            programAreas.add(program.program);
            sectors.add(program.sector);
            planNames.add(plan.name);
          });
        }
      });
    });

    setUniqueCredentials(Array.from(credentials));
    setUniqueSectors(Array.from(sectors));
    setUniqueProgramAreas(Array.from(programAreas));
    setUniquePlanNames(Array.from(planNames));
  }, []);

  // Check if uniqueCredentialTypes is undefined
  if (!uniqueCredentialTypes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary h-[720px]">
      <div className="w-full h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <video
            src="https://www.dropbox.com/s/sd90kljtxqp68dg/background-video.mp4?raw=1"
            className="object-cover w-full h-full"
            autoPlay
          ></video>
        </Suspense>
        <div className="absolute top-0 w-full h-full pb-[32px]">
          <div className="container px-[24px] lg:px-0 mx-auto h-full">
            <div className="flex h-full items-end lg:items-center justify-end">
              <div className="w-full lg:w-1/2 flex flex-col">
                <h1 className="text-[64px] leading-[64px] xl:text-[76px] text-[white] font-black mb-[32px]">
                  {highlightedTitle}
                </h1>
                <div>
                  <h4 className="text-[20px] text-white font-semibold mb-[12px] uppercase">
                    Your Future Starts Now.
                  </h4>
                  <div className="flex flex-col gap-[16px] items-start">
                    <Filters
                      uniqueCredentials={uniqueCredentials}
                      uniqueCredentialTypes={uniqueCredentialTypes}
                      setUniqueCredentialTypes={setUniqueCredentialTypes}
                      selectedCredentialTypes={selectedCredentialTypes}
                      setSelectedCredentialTypes={setSelectedCredentialTypes}
                      handleCredentialTypeChange={handleCredentialTypeChange}
                      uniqueProgramAreas={uniqueProgramAreas}
                      uniquePlanNames={uniquePlanNames}
                      selectedCredential={selectedCredential}
                      setSelectedCredential={setSelectedCredential}
                      selectedArea={selectedArea}
                      setSelectedArea={setSelectedArea}
                      selectedPlan={selectedPlan}
                      setSelectedPlan={setSelectedPlan}
                      selectedSector={selectedSector}
                      setSelectedSector={setSelectedSector}
                      setUniqueSectors={setUniqueSectors}
                      programs={programs}
                      backgroundColor={"dark"}
                      showExplore={"true"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSearch;
