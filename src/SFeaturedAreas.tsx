import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "./components/Button";
import programs from "./programs-20240510";
import FeaturedAreasList2 from "./components/FeaturedAreas2";
import ProgramsList from "./components/ProgramsList";
import ProgramResults from "./components/ProgramResults";

function SFeaturedAreas() {
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedArea, setSelectedArea] = useState("Paralegal");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [uniqueCredentialTypes, setUniqueCredentialTypes] = useState([]);
  const [selectedCredentialTypes, setSelectedCredentialTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [academicPlans, setAcademicPlans] = useState([]);
  const [uniqueCredentials, setUniqueCredentials] = useState([]);
  const [uniqueProgramAreas, setUniqueProgramAreas] = useState([]);
  const [uniqueSectors, setUniqueSectors] = useState([]);
  const [uniquePlanNames, setUniquePlanNames] = useState([]);
  const [filteredAcademicPlans, setFilteredAcademicPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState({}); // State to track expanded state for each program
  const [isExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const handleProgramAreaClick = (title) => {
    setSelectedArea(title);
    console.log("Clicked on:", title);
  };

  console.log(selectedArea);

  useEffect(() => {
    // Filter the academic plans based on the search query, selected filters, etc.
    const filteredPlans = academicPlans.filter((plan) => {
      // Check if the plan's credential type is included in the selected credential types
      const matchesCredentialTypes =
        selectedCredentialTypes.length === 0 ||
        selectedCredentialTypes.includes(plan.credential_type);

      // Other filtering conditions remain unchanged
      const matchesSearch =
        !searchQuery ||
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.credentials_awarded
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesFilters =
        (!selectedCredential || plan.credential_type === selectedCredential) &&
        (!selectedArea || plan.area === selectedArea) &&
        (!selectedPlan || plan.name === selectedPlan); // Consider the selected sector filter

      return matchesSearch && matchesFilters && matchesCredentialTypes;
    });

    // Update the filtered academic plans state
    setFilteredAcademicPlans(filteredPlans);

    // Logging for debugging
    console.log("Selected Credential Types:", selectedCredentialTypes);
    console.log("Filtered Academic Plans:", filteredPlans);
  }, [
    selectedCredential,
    selectedCredentialTypes,
    selectedArea,
    selectedPlan,
    academicPlans,
    searchQuery,
  ]);

  // useEffect to populate academicPlans with unique academic plans data
  useEffect(() => {
    // Function to extract unique academic plans from programs data
    const getUniqueAcademicPlans = () => {
      const uniquePlans = {};

      programs.forEach((program) => {
        program.colleges.forEach((college) => {
          if (college.academic_plans && college.academic_plans.length > 0) {
            college.academic_plans.forEach((plan) => {
              const key = `${plan.name} - ${plan.credentials_awarded}`;
              if (!uniquePlans[key]) {
                uniquePlans[key] = {
                  name: plan.name,
                  credentials_awarded: plan.credentials_awarded,
                  credential_type: plan.credential_type,
                  colleges: [],
                  area: program.program,
                  sector: program.sector,
                };
              }
              uniquePlans[key].colleges.push(college);
            });
          }
        });
      });

      return Object.values(uniquePlans);
    };

    // Update academicPlans state with unique academic plans data
    const uniqueAcademicPlans = getUniqueAcademicPlans();
    setAcademicPlans(uniqueAcademicPlans);
  }, []);
  const textRef = useRef(null);

  useEffect(() => {
    // Filter the academic plans based on the selected credential types
    const filteredPlans = academicPlans.filter((plan) =>
      selectedCredentialTypes.includes(plan.credential_type),
    );

    // Update the filtered academic plans state
    setFilteredAcademicPlans(filteredPlans);
  }, [selectedCredentialTypes, academicPlans, selectedArea]);

  // Function to filter academic plans based on selected area
  const filterAcademicPlansByArea = (area) => {
    const filteredPlans = academicPlans.filter((plan) => plan.area === area);
    setFilteredAcademicPlans(filteredPlans);
  };

  // Effect to filter academic plans based on the selected area when component mounts or selected area changes
  useEffect(() => {
    filterAcademicPlansByArea(selectedArea);
  }, [selectedArea, academicPlans]);

  return (
    <>
      <div className="lg:pt-[128px] lg:pb-[96px]">
        <div className="flex flex-col">
          <div className="relative w-full group overflow-hidden">
            <div className="px-[24px] container mx-auto px-[24px] lg:px-0 flex items-end mb-[40px] lg:mb-[48px] w-full">
              <h1 className="text-[48.8px] leading-[52px] w-[50%] lg:text-[61.04px] lg:leading-[64px] text-[#00467F] font-[800]">
                Real World Success,{" "}
                <span className="whitespace-nowrap">
                  <span className="bar">Anywhere</span>
                  <span className="dot">.</span>
                </span>
              </h1>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[64px] mb-[48px] lg:mb-[0] items-center lg:container lg:mx-auto lg:px-0">
            <div className="w-full lg:w-[50%] h-full relative z-1 aspect-[16/9] overflow-hidden lg:rounded-tr-[12px] lg:rounded-br-[12px]">
              <img
                className="w-full group-hover:scale-110 transition ease-in-out duration-[250ms] h-full absolute z-1 object-cover"
                src="./src/assets/admissions.jpeg"
              />
            </div>
            <div className="px-[24px] lg:px-0 max-w-[596px]">
              <p className="text-[25px] font-[600] text-[#00467F]">
                Whether you’re starting college for the first time or thinking
                about a career change, we’ve got you covered. We offer associate
                degrees, diplomas and certificates - and we’re here to help you
                reach your goals. Get started by finding the program that works
                for you!
              </p>
              <div className="w-full text-center">
                <a
                  href="/programs"
                  className="text-[17.5px] mt-[32px] lg:mt-[48px] rounded-full border inline-block transition ease-in-out text-center cursor-pointer width-auto bg-[#00467F] text-white py-[16px] font-semibold px-[48px] hover:bg-white hover:text-[#00467F] hover:border-[#00467F]"
                >
                  Explore Programs
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full container mx-auto px-[24px] lg:px-0 mx-auto pb-[64px] lg:pt-[56px] border-t-[1px] border-[#f0f0f0] lg:pb-[96px]">
        <div className="flex flex-col lg:flex-row gap-[32px] lg:gap-[72px]">
          <div className="w-full lg:w-[30%] lg:sticky lg:top-0 h-full">
            <h3 className="text-[31px] leading-[36px] lg:text-[39px] leading-[44px] mb-[32px] font-[800] text-[#00467F]">
              Programs that fit your needs.
            </h3>
            <FeaturedAreasList2
              handleProgramAreaClick={handleProgramAreaClick}
              academicPlans={academicPlans}
              setAcademicPlans={setAcademicPlans}
            />
          </div>
          <div className="w-full  lg:w-[70%]">
            <div className={`w-full hidden lg:block `}>
              <ProgramResults
                key={selectedArea}
                darkBg={true}
                showCount={false}
                filteredAcademicPlans={filteredAcademicPlans}
                selectedArea={selectedArea}
                square={true}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center lg:mt-[64px]">
          <Button href="/programs.aspx" label="Explore All Programs" />
        </div>
      </div>
    </>
  );
}

export default SFeaturedAreas;
