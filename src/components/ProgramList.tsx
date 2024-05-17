import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const ProgramList = () => {
  const [programs, setProgramsList] = useState([]);
  const [newProgramName, setNewProgramName] = useState("");
  const [newProgramDegree, setNewProgramDegree] = useState("");
  const [newProgramDescription, setNewProgramDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchPrograms(); // Fetch programs when the component mounts
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(
        "https://dnyx42-3003.csb.app/api/programs",
      ); // Make GET request to fetch programs
      setProgramsList(response.data); // Update programsList state with fetched data
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  const addProgram = async () => {
    const newProgram = {
      program: newProgramName || "New Program",
      degree: newProgramDegree || "Certificate",
      description: newProgramDescription || "Description of the new program.",
    };

    try {
      const response = await axios.post(
        "https://dnyx42-3002.csb.app/api/programs",
        newProgram,
      ); // Make POST request to add program
      setProgramsList([...programs, response.data]); // Update programsList state with new program
      setSuccessMessage("Program successfully added!"); // Set success message
    } catch (error) {
      console.error("Error adding program:", error);
    }

    // Reset input fields after adding program
    setNewProgramName("");
    setNewProgramDegree("");
    setNewProgramDescription("");
  };

  const removeProgram = async (id) => {
    try {
      await axios.delete(`https://dnyx42-3002.csb.app/api/programs/`); // Make DELETE request to remove program
    } catch (error) {
      console.error("Error removing program:", error);
    }
  };

  // Function to clear success message after some time
  const clearSuccessMessage = () => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000); // Clear message after 3 seconds
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Program List</h1>
      {successMessage && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="block sm:inline">{successMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              onClick={() => setSuccessMessage("")}
            >
              <title>Close</title>
              <path
                fillRule="evenodd"
                d="M14.348 5.652a.5.5 0 0 1 0 .707l-8 8a.5.5 0 0 1-.708-.707l8-8a.5.5 0 0 1 .708 0z"
              />
              <path
                fillRule="evenodd"
                d="M5.652 5.652a.5.5 0 0 0-.707.707l8 8a.5.5 0 0 0 .707-.707l-8-8z"
              />
            </svg>
          </span>
        </div>
      )}
      <div className="mb-4">
        <label className="block mb-1">Name:</label>
        <input
          type="text"
          value={newProgramName}
          onChange={(e) => setNewProgramName(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Degree:</label>
        <input
          type="text"
          value={newProgramDegree}
          onChange={(e) => setNewProgramDegree(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Description:</label>
        <textarea
          value={newProgramDescription}
          onChange={(e) => setNewProgramDescription(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 w-full"
        />
      </div>
      <button
        onClick={addProgram}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Program
      </button>
      <ul className="mt-4">
        {programs.map(
          (program) =>
            program && (
              <li key={program.id} className="border-b border-gray-300 py-4">
                <h2 className="text-xl font-semibold cursor-pointer">
                  {program.program}
                </h2>
                <div className="px-4">
                  <p>Degree: {program.degree}</p>
                  <p>Description: {program.description}</p>
                  <button
                    onClick={() => removeProgram(program.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded mt-2 hover:bg-red-600"
                  >
                    Remove Program
                  </button>
                </div>
              </li>
            ),
        )}
      </ul>
    </div>
  );
};

export default ProgramList;
