import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Home-alt";
import TuitionAndCost from "./TuitionAndCost";
import StudentSupportServices from "./StudentSupportServices";
import CurrentStudents from "./CurrentStudents";
import SuccessStories from "./SuccessStories";
import ProgramList from "./components/ProgramList";
import Programs from "./Programs-v2";
import RfiModal from "./components/RfiModal";
import StudentStoryFeature from "./components/StudentStoryFeature";

import "./App.css";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <Router basename="./">
        {showModal && <RfiModal onClose={() => setShowModal(false)} />}
        <Header showModal={showModal} setShowModal={setShowModal} />
        <div>
          <AnimatePresence mode="wait">
            <Switch>
              <Route exact path="/">
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Home />
                </motion.div>
              </Route>

              <Route path="/admissions">
                <motion.div
                  key="admissions"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Admissions />
                </motion.div>
              </Route>
              <Route path="/tuition-and-cost">
                <motion.div
                  key="tuition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <TuitionAndCost />
                </motion.div>
              </Route>
              <Route path="/student-support-services">
                <motion.div
                  key="support"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StudentSupportServices />
                </motion.div>
              </Route>
              <Route path="/success-stories">
                <motion.div
                  key="success-stories"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SuccessStories />
                </motion.div>
              </Route>
              <Route path="/current-students">
                <motion.div
                  key="students"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <CurrentStudents />
                </motion.div>
              </Route>
              <Route path="/programs">
                <motion.div
                  key="programs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Programs />
                </motion.div>
              </Route>
              <Route path="/program-list">
                <ProgramList />
              </Route>
            </Switch>
          </AnimatePresence>
        </div>
      </Router>
      <Footer showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
}

export default App;
