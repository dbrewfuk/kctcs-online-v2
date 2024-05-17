import React, { useState, useEffect } from "react";
import programs from "../programs-v2.json"; // Import programs data

function Results() {
  const [academicPlans, setAcademicPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    credentials: "",
    areas: "",
    plans: "",
  });

  // Function to extract unique academic plans from programs data
  const getUniqueAcademicPlans = (programs) => {
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

  // Handle filter change events and update selected filters
  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleToggleExpand = (index) => {
    // Implement the logic to toggle the expanded state for a program
  };

  return (
    <div className="w-full">
      <div className="bg-[#fafafa]">
        <div className="container flex flex-col gap-[32px] mx-auto px-[24px] py-[32px]">
          {/* Results section */}
          <div className="grid grid-cols-1">
            {filteredPlans.length}
            {filteredPlans.map((plan, index) => (
              <div key={index}>
                {/* Your result rendering logic here */}
                <div className="transition-all ease duration-[200ms] border-b">
                  <div className="flex flex-col h-full justify-between relative">
                    <div className="flex justify-between">
                      <div
                        className="flex py-[24px] flex-col items-start md:flex-row gap-[8px]"
                        onClick={() => handleToggleExpand(index)}
                      >
                        <h3 className="text-[32px] leading-[36px] text-[#00467F] font-semibold">
                          {plan.name}
                        </h3>
                        <span className="py-[8px] inline-block font-semibold text-[#00467F] px-2 bg-gray-100 rounded text-[14px]">
                          {plan.credentials_awarded}
                        </span>
                      </div>
                      <div className="absolute right-[24px] top-[24px]"></div>
                    </div>
                    {/* Add your expandable content here */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;
