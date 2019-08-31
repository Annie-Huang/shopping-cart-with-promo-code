// Problem #1: No loading indicator on course list
// Problem #2: No loading indicator when saving a course
// Problem #3: No loading indicator when loading a course
// Solution: Display a spinner while loading

import React from "react";
import "./Spinner.css";

const Spinner = () => {
    return <div className="loader">Loading...</div>;
};

export default Spinner;
