import React from "react";
import { PLAYERS } from "../constants/Players";
const PlayerClock = ({
  turnPlayer,
  handleClick,
  minutes,
  seconds,
  turn,
  name,
}) => {
  const clockClasses =
    name === PLAYERS.player1
      ? "h-auto  flex flex-col max-[400px]:rotate-180  max-[400px]:w-full  max-[400px]:h-full  items-center justify-center w-4/5 bg-white rounded-md"
      : "h-auto flex flex-col items-center justify-center w-4/5 max-[400px]:w-full max-[400px]:h-full  rounded-md bg-black";

  const numberClases = name === PLAYERS.player1 ? "text-black" : "text-white";

  return (
    <div
      style={
        turnPlayer ? { border: "10px  solid green" } : { pointerEvents: "none" }
      }
      className={clockClasses}
      onClick={handleClick}>
      <h1
        draggable="false"
        className={`font-semibold  text-7xl md:text-xl ${numberClases}`}>
        {" "}
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>
      <p className={`text-3xl font-light ${numberClases}`}>
        {turnPlayer ? `Turn ${PLAYERS[turn]}` : ""}
      </p>
    </div>
  );
};

export default PlayerClock;
