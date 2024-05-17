import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Testimonial from "./components/Testimonial";
import HeroSearch from "./components/HeroSearch";
import Search from "./components/Search";
import HeroRfi from "./components/HeroRfi";
import Header from "./components/Header";
import DynamicSections from "./DynamicSections";
import VideoBlockSlider from "./components/VideoBlockSlider";
import InterestGrid from "./components/InterestGrid";
import VideoSlider from "./components/VideoSlider";
import programs from "./programs-20240207";

function CurrentStudents() {
  const [selectedCredential, setSelectedCredential] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [uniqueCredentialTypes, setUniqueCredentialTypes] = useState([]);
  const [selectedCredentialTypes, setSelectedCredentialTypes] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [academicPlans, setAcademicPlans] = useState([]);
  const [uniqueCredentials, setUniqueCredentials] = useState([]);
  const [uniqueProgramAreas, setUniqueProgramAreas] = useState([]);
  const [uniquePlanNames, setUniquePlanNames] = useState([]);
  const [filteredAcademicPlans, setFilteredAcademicPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedPrograms, setExpandedPrograms] = useState({}); // State to track expanded state for each program
  const [isExpanded] = useState(false);
  const [selectedColleges, setSelectedColleges] = useState(
    Array(filteredAcademicPlans.length).fill({ name: "", url: "" }),
  );
  const videoUrls = [
    "https://player.vimeo.com/video/665275644?background=1&autoplay=1&loop=1&byline=0&title=0",
    "https://player.vimeo.com/video/678281924?background=1&autoplay=1&loop=1&byline=0&title=0",
  ];
  const captions = [
    "Bluegrass Community & Technical College",
    "West Kentucky Community & Technical College",
  ];
  const delay = 20000;

  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    history.push(`/programs?search=${searchQuery}`);
    window.location.href = `/programs?search=${searchQuery}`;
  };
  useEffect(() => {
    // Extract unique credential types from programsData
    const credentialTypesSet = new Set();

    // Iterate over each program
    programs.forEach((program) => {
      // Iterate over each college in the program
      program.colleges.forEach((college) => {
        // Check if academic plans exist and iterate over them
        if (college.academic_plans && college.academic_plans.length > 0) {
          college.academic_plans.forEach((plan) => {
            // Add the credential type to the Set
            credentialTypesSet.add(plan.credential_type);
          });
        }
      });
    });

    // Convert the Set to an array
    const uniqueTypesArray = Array.from(credentialTypesSet);

    // Update state with unique credential types
    setUniqueCredentialTypes(uniqueTypesArray);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <>
      <div className="relative">
        <HeroSearch
          title="Current Students"
          highlighted=""
          uniqueCredentialTypes={uniqueCredentialTypes}
          setUniqueCredentialTypes={setUniqueCredentialTypes}
        />
      </div>
      <div className="py-[64px] lg:py-[96px] bg-blue-900 relative">
        <div className="container mx-auto px-8">
          <div className="flex flex-col lg:flex-row items-end gap-6">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl lg:text-6xl font-black text-white mb-5">
                Information for Current Students
              </h1>
              <p className="text-xl lg:text-2xl text-white">
                Students come first at KCTCS, and we want you to find what you
                need quickly and easily. To do that we've put all your favorite
                links in one place.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 z-10 translate-y-full -translate-x-1/2 left-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="142"
            height="56"
            viewBox="0 0 142 71"
            fill="#005CB8"
            className="fill-blue-900"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.578613 0L71 70.4214L141.421 0H0.578613Z"
              fill="#005CB8"
            />
          </svg>
        </div>
      </div>

      <div className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3]">
              <img
                className="w-full h-full object-cover"
                src="./assets/as3.jpeg"
                alt="Placeholder"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="p-8 lg:p-[96px] flex flex-col h-full justify-center align-items-center">
              <h1 className="text-4xl lg:text-5xl font-[800] text-[#00467F] mb-3">
                MyPath
              </h1>
              <p className="text-l lg:text-xl text-[#00467F] mb-8">
                From Email to Office 365, from Blackboard to Student
                Self-Service, your path to the right information is super easy
                thanks to Single Sign On in MyPath.
              </p>
              <div className="text-center lg:text-left">
                <div className="rounded-full text-xl border inline-block transition ease-in-out text-center cursor-pointer width-auto bg-blue-900 text-white py-3 font-semibold px-6 hover:bg-white hover:text-blue-900 hover:border-blue-900">
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 lg:order-2">
            <div className="aspect-[4/3]">
              <img
                className="w-full h-full object-cover"
                src="./assets/as2.jpeg"
                alt="Placeholder"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="p-8 lg:p-[96px] flex flex-col h-full justify-center align-items-center">
              <h1 className="text-4xl lg:text-5xl font-[800] text-[#00467F] mb-4">
                Academic Resources
              </h1>
              <p className="text-l lg:text-xl text-[#00467F] mb-8">
                We want you to succeed. With that in mind, we offer a variety of
                services and programs to help you achieve your academic and
                career goals.
              </p>
              <div className="text-center lg:text-left">
                <div className="rounded-full text-xl border inline-block transition ease-in-out text-center cursor-pointer width-auto bg-blue-900 text-white py-3 font-semibold px-6 hover:bg-white hover:text-blue-900 hover:border-blue-900">
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3]">
              <img
                className="w-full h-full object-cover"
                src="./assets/as1.jpeg"
                alt="Placeholder"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="p-8 lg:p-[96px] flex flex-col h-full justify-center align-items-center">
              <h1 className="text-4xl lg:text-5xl font-[800] text-[#00467F] mb-4">
                Student Services
              </h1>
              <p className="text-l lg:text-xl text-[#00467F] mb-8">
                Are you a first-year college student? Unsure about what it takes
                to be successful? Our Student Services can help.
              </p>
              <div className="text-center lg:text-left">
                <div className="rounded-full text-xl border inline-block transition ease-in-out text-center cursor-pointer width-auto bg-blue-900 text-white py-3 font-semibold px-6 hover:bg-white hover:text-blue-900 hover:border-blue-900">
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InterestGrid />
    </>
  );
}

export default CurrentStudents;
