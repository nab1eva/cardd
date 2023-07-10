import React from "react";
import { BsArrowUpRightCircle } from "react-icons/bs";
import { CgNotes } from "react-icons/cg";

const Footer = ({ handleShow, handleTab }) => {
  return (
    <footer className="px-2">
      <div className="menu-left">
        <button
          className="menu-btn btn btn-primary d-flex flex-column align-items-center"
          onClick={() => handleTab(1)}
        >
          <BsArrowUpRightCircle className="operations-icon" />
          Operations
        </button>
      </div>
      <button className="add-btn btn btn-success" onClick={handleShow}>
        +
      </button>
      <div className="menu-right">
        <button
          className="menu-btn btn btn-primary d-flex flex-column align-items-center"
          onClick={() => handleTab(2)}
        >
          <CgNotes className="operations-icon" /> 
          Taxes
        </button>
      </div>
    </footer>
  );
};

export default Footer;
