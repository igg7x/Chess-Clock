import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faGear,
  faRotateRight,
  faChessKing,
  faChessQueen,
} from "@fortawesome/free-solid-svg-icons";

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
      setTurnPlayer("player1");
    }
  };

  const handleClick = () => {
    if (!stop) {
      setTurnPlayer((prev) => (prev === "player1" ? "player2" : "player1"));
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
    if (turnPlayer === "player1") {
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

  console.log(intervalPlayer1Ref.current);
  console.log(intervalPlayer2Ref.current);
  return (
    <div className="flex gap-10 flex-col  items-center  justify-center bg-gray-700  h-screen ">
      <h3 className="font-bold  text-3xl">
        <FontAwesomeIcon className=" text-white" icon={faChessQueen} />
        <span className="text-black"> CHESS</span>
        <span className="text-white"> CLOCK </span>
        <FontAwesomeIcon className="text-black" icon={faChessKing} />
      </h3>
      <div className="flex  gap-4">
        <div
          style={
            turnPlayer === "player1" ? { border: "10px  solid green" } : {}
          }
          className="h-72  flex  flex-col items-center justify-center w-72 bg-white rounded-md"
          onClick={handleClick}>
          {!minutesPlayer1 && secondsPlayer1 ? (
            ""
          ) : (
            <p className="font-semibold text-4xl text-black">
              {" "}
              {minutesPlayer1}:
              {secondsPlayer1 < 10 ? `0${secondsPlayer1}` : secondsPlayer1}
            </p>
          )}
          <p className=" text-3xl font-light text-black">
            {" "}
            {turnPlayer === "player1" ? "Turn of " : ""} Player 1
          </p>
        </div>
        <div
          style={
            turnPlayer === "player2" ? { border: "10px  solid green" } : {}
          }
          onClick={handleClick}
          className="h-72 flex  flex-col items-center justify-center w-72 bg-black rounded-md">
          {!minutesPlayer2 && secondsPlayer2 ? (
            ""
          ) : (
            <p className="font-semibold text-4xl text-white">
              {" "}
              {minutesPlayer2}:
              {secondsPlayer2 < 10 ? `0${secondsPlayer2}` : secondsPlayer2}
            </p>
          )}
          <p className=" text-3xl font-light text-white">
            {" "}
            {turnPlayer === "player2" ? "Turn of " : ""} Player 2
          </p>
        </div>
      </div>

      <div className="flex justify-center gap-5">
        <button>
          <FontAwesomeIcon size="2xl" icon={faGear} />
        </button>
        <button onClick={handleStart}>
          {stop ? (
            <FontAwesomeIcon size="2xl" icon={faPause} />
          ) : (
            <FontAwesomeIcon size="2xl" icon={faPlay} />
          )}
        </button>
        <button onClick={handleReset}>
          <FontAwesomeIcon size="2xl" icon={faRotateRight} />
        </button>
      </div>
    </div>
  );
};

export default BoardSide;
