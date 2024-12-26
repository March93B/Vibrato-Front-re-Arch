import React, { useState } from "react";
import "../Styles/dropdownExplore.css";

const DropdownExplore = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setIsOpen(false);
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-container-explore">
      <div className={`dropdown-explore ${isOpen ? "open" : ""}`} onClick={handleDropdownClick}>
        <div className="dropdown-selected-explore">{selectedOption.label}</div>
        <div className="dropdown-icon-explore">&#9662;</div>
      </div>
      {isOpen && (
        <div className="dropdown-options-explore">
          {options.map((option) => (
            <div className="ops-explore" key={option.value} onClick={() => handleOptionSelect(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownExplore;