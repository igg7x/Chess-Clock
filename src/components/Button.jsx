import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Buttons = ({ icon, onButtonClick }) => {
  return (
    <button onClick={onButtonClick}>
      <FontAwesomeIcon size="3x" icon={icon} />
    </button>
  );
};

export default Buttons;
