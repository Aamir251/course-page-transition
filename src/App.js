import "./styles.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Course from "./pages/Course";
import AllCourses from "./pages/AllCourses";
import { AnimatePresence } from "framer-motion";
export default function App() {
  const location = useLocation();
  return (
    <div className="App">
      <AnimatePresence initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AllCourses />}></Route>
          <Route path="/:id" element={<Course />}></Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
}
