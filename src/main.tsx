// main.tsx file
import React from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./Home-alt";
import Admissions from "./Admissions";
import StudentSupportServices from "./StudentSupportServices";
import TuitionAndCost from "./TuitionAndCost";
import SuccessStories from "./SuccessStories";
import Programs from "./Programs-v2";
import "./App.css";
import "./index.scss";

if (document.getElementById("home-root")) {
  ReactDOM.createRoot(
    document.getElementById("home-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>,
  );
}

if (document.getElementById("admissions-root")) {
  ReactDOM.createRoot(
    document.getElementById("admissions-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <Admissions />
    </React.StrictMode>,
  );
}

if (document.getElementById("student-services-root")) {
  ReactDOM.createRoot(
    document.getElementById("student-services-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <StudentSupportServices />
    </React.StrictMode>,
  );
}

if (document.getElementById("success-stories-root")) {
  ReactDOM.createRoot(
    document.getElementById("success-stories-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <SuccessStories />
    </React.StrictMode>,
  );
}

if (document.getElementById("tuition-root")) {
  ReactDOM.createRoot(
    document.getElementById("tuition-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <TuitionAndCost />
    </React.StrictMode>,
  );
}

if (document.getElementById("programs-root")) {
  ReactDOM.createRoot(
    document.getElementById("programs-root") as HTMLElement,
  ).render(
    <React.StrictMode>
      <Programs />
    </React.StrictMode>,
  );
}
