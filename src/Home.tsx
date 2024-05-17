import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Testimonial from "./components/Testimonial";
import DynamicSections from "./DynamicSections";

function Home() {
  return (
    <>
      <DynamicSections />
    </>
  );
}

export default Home;
