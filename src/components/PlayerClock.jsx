import React from "react";
import { PLAYERS } from "../constants/Players";
const PlayerClock = ({
  turnPlayer,
  handleClick,
  minutes,
  seconds,
  name,
  player,
}) => {
  const clockClasses =
    player === PLAYERS.player1
      ? "h-auto  flex flex-col max-[500px]:rotate-180  max-[500px]:w-full  max-[500px]:h-full  items-center justify-center w-4/5 bg-white rounded-md"
      : "h-auto flex flex-col items-center justify-center w-4/5 max-[500px]:w-full max-[500px]:h-full  rounded-md bg-black";

  const numberClases = player === PLAYERS.player1 ? "text-black" : "text-white";

  return (
    <div
      style={
        turnPlayer === name
          ? { border: "20px  solid green" }
          : { pointerEvents: "none" }
      }
      className={clockClasses}
      onClick={handleClick}>
      <p>
        {minutes === 0 && seconds < 15 ? (
          <span className="text-red-500  font-semibold text-3xl">
            {seconds} SECONDS LEFT!
          </span>
        ) : null}
      </p>
      <h1
        draggable="false"
        className={`font-semibold  text-7xl md:text-xl ${numberClases}`}>
        {" "}
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h1>

      <p className={`text-3xl font-bold ${numberClases}`}>
        {turnPlayer === name ? `Turn ${name}` : `${name}`}
      </p>
    </div>
  );
};

export default PlayerClock;
