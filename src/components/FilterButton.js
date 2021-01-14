import React from "react";

const FilterButton = (props) => {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed="true"
      onClick={props.changedTab}
    >
      <span>{props.name}</span>
    </button>
  );
};

export default FilterButton;
