import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyCalendar from "./components/Calender";
import SummaryPage from "./components/SummaryPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MyCalendar />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  </Router>
);

export default App;
