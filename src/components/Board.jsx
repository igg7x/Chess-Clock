import React, { useState, useEffect, useRef } from "react";
import { PLAYERS } from "../constants/Players";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faGear,
  faRotateRight,
  faChessKing,
  faChessQueen,
} from "@fortawesome/free-solid-svg-icons";
import PlayerClock from "./PlayerClock";
import Button from "./Button";

const BoardSide = () => {
  const [minutesPlayer1, setMinutesPlayer1] = useState(15);
  const [secondsPlayer1, setSecondsPlayer1] = useState(0);
  const [minutesPlayer2, setMinutesPlayer2] = useState(15);
  const [secondsPlayer2, setSecondsPlayer2] = useState(0);
  const [turnPlayer, setTurnPlayer] = useState("");
  const [stop, setStop] = useState(true);
  const intervalPlayer1Ref = useRef(null);
  const intervalPlayer2Ref = useRef(null);

  const handleStart = () => {
    setStop(!stop);
    if (!turnPlayer) {
      setTurnPlayer(PLAYERS.player1);
    }
  };

  const handleClick = () => {
    if (!stop) {
      setTurnPlayer((prev) =>
        prev === PLAYERS.player1 ? PLAYERS.player2 : PLAYERS.player1
      );
    }
  };

  const handleReset = () => {
    setMinutesPlayer1(15);
    setSecondsPlayer1(0);
    setMinutesPlayer2(15);
    setSecondsPlayer2(0);
    setTurnPlayer("");
    setStop(true);
    clearsIntervals();
  };

  // const handleKeyDown = (e) => {
  //   // console.log(e);
  //   // if (e.keyCode === 32) {
  //   //   if (turnPLayer1) {
  //   //     setTurnPlayer1(false);
  //   //     setTurnPlayer2(true);
  //   //   } else {
  //   //     setTurnPlayer1(true);
  //   //     setTurnPlayer2(false);
  //   //   }
  //   // }
  // };

  const createInterval = (seconds, minutes, setSeconds, setMinutes) => {
    if (seconds > 0) {
      setSeconds((prev) => prev - 1);
    }
    if (seconds === 0) {
      if (minutes === 0) {
        clearInterval(intervalPlayer1Ref.current);
      } else {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      }
    }
  };

  function clearsIntervals() {
    clearInterval(intervalPlayer1Ref.current);
    clearInterval(intervalPlayer2Ref.current);
  }
  //TIMER PLAYER 1
  useEffect(() => {
    if (stop) {
      clearsIntervals();
      return;
    }
    if (turnPlayer === PLAYERS.player1) {
      intervalPlayer1Ref.current = setInterval(
        () =>
          createInterval(
            secondsPlayer1,
            minutesPlayer1,
            setSecondsPlayer1,
            setMinutesPlayer1
          ),
        1000
      );
    } else {
      intervalPlayer2Ref.current = setInterval(
        () =>
          createInterval(
            secondsPlayer2,
            minutesPlayer2,
            setSecondsPlayer2,
            setMinutesPlayer2
          ),
        1000
      );
    }
    return () => {
      clearsIntervals();
    };
  }, [
    turnPlayer,
    minutesPlayer1,
    secondsPlayer1,
    secondsPlayer2,
    minutesPlayer2,
    stop,
  ]);

  //TIMER PLAYER 2
  // useEffect(() => {
  //   if (stop) {
  //     return;
  //   }
  //   intervalPlayer2Ref.current = setInterval(
  //     () =>
  //       createInterval(
  //         secondsPlayer2,
  //         minutesPlayer2,
  //         setSecondsPlayer2,
  //         setMinutesPlayer2
  //       ),
  //     1000
  //   );
  //   return () => {
  //     clearInterval(intervalPlayer2Ref.current);
  //   };
  // }, [turnPlayer, minutesPlayer2, secondsPlayer2]);

  // const startTimer = () => {
  //   if (stop) {
  //     return;
  //   }
  //   intervalPlayer1Ref.current = setInterval(
  //     () =>
  //       createInterval(
  //         secondsPlayer1,
  //         minutesPlayer1,
  //         setSecondsPlayer1,
  //         setMinutesPlayer1
  //       ),
  //     1000
  //   );
  //   clearInterval(intervalPlayer1Ref.current);
  // };

  return (
    <div className="flex gap-10 flex-col  items-center  justify-center bg-gray-700  h-screen ">
      <h3 className="font-bold  text-3xl">
        <FontAwesomeIcon className=" text-white" icon={faChessQueen} />
        <span className="text-black"> CHESS</span>
        <span className="text-white"> CLOCK </span>
        <FontAwesomeIcon className="text-black" icon={faChessKing} />
      </h3>
      <div className="flex  gap-4">
        <PlayerClock
          turn={turnPlayer}
          turnPlayer={turnPlayer === PLAYERS.player1}
          handleClick={handleClick}
          minutes={minutesPlayer1}
          seconds={secondsPlayer1}
        />
        <PlayerClock
          turn={turnPlayer}
          turnPlayer={turnPlayer === PLAYERS.player2}
          handleClick={handleClick}
          minutes={minutesPlayer2}
          seconds={secondsPlayer2}
        />
      </div>
      <div className="flex justify-center gap-5">
        <Button icon={faGear} />
        <button onClick={handleStart}>
          {stop ? (
            <FontAwesomeIcon size="2xl" icon={faPause} />
          ) : (
            <FontAwesomeIcon size="2xl" icon={faPlay} />
          )}
        </button>
        <Button onButtonClick={handleReset} icon={faRotateRight} />
      </div>
    </div>
  );
};

export default BoardSide;
