import React from "react";
import { PLAYERS } from "../constants/Players";
const PlayerClock = ({ turnPlayer, handleClick, minutes, seconds, turn }) => {
  console.log(turn);
  return (
    <div
      style={turnPlayer ? { border: "10px  solid green" } : {}}
      className="h-72  flex  flex-col items-center justify-center w-72 bg-white rounded-md"
      onClick={handleClick}>
      {!minutes && seconds ? (
        ""
      ) : (
        <p className="font-semibold text-4xl text-black">
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </p>
      )}
      <p className="text-3xl font-light text-black">
        {turnPlayer ? `Turn ${PLAYERS[turn]}` : ""}
      </p>
    </div>
  );
};

export default PlayerClock;
