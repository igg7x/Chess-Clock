import React, { memo } from "react";
import MemoizedFontAwesomeIcon from "./MemoizedFontAwesomeIcon";

const Buttons = memo(({ icon, onButtonClick }) => {
  return (
    <button onClick={onButtonClick}>
      <MemoizedFontAwesomeIcon size={"3x"} icon={icon} />
    </button>
  );
});

export default Buttons;
