import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faGear,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

const BoardSide = () => {
  const [minutesPlayer1, setMinutesPlayer1] = useState(15);
  const [secondsPlayer1, setSecondsPlayer1] = useState(0);
  const [minutesPlayer2, setMinutesPlayer2] = useState(15);
  const [secondsPlayer2, setSecondsPlayer2] = useState(0);
  const [turnPlayer1, setTurnPlayer1] = useState(false);
  const [turnPlayer2, setTurnPlayer2] = useState(false);
  const [stop, setStop] = useState(true);
  const intervalPlayer1Ref = useRef(null);
  const intervalPlayer2Ref = useRef(null);

  const handleStart = () => {
    setStop(!stop);
    if (!turnPlayer1 && !turnPlayer2) setTurnPlayer1(true);
    // startTimer();
  };

  const handleClick = () => {
    if (!stop) {
      if (turnPlayer1) {
        setTurnPlayer1(false);
        setTurnPlayer2(true);
      } else {
        setTurnPlayer1(true);
        setTurnPlayer2(false);
      }
    }
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
  //TIMER PLAYER 1
  useEffect(() => {
    if (stop) {
      return;
    }
    if (intervalPlayer2Ref.current) {
      clearInterval(intervalPlayer2Ref.current);
    }
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
    return () => {
      clearInterval(intervalPlayer1Ref.current);
    };
  }, [turnPlayer1, minutesPlayer1, secondsPlayer1]);

  //TIMER PLAYER 2
  useEffect(() => {
    if (stop) {
      return;
    }
    if (intervalPlayer1Ref.current) {
      clearInterval(intervalPlayer1Ref.current);
    }
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
    return () => {
      clearInterval(intervalPlayer2Ref.current);
    };
  }, [turnPlayer2, minutesPlayer2, secondsPlayer2]);

  // const startTimer = () => {
  //   clearInterval(interval);
  //   const interval = setInterval(() => {
  //     if (secondsPlayer1 > 0) {
  //       setSecondsPlayer1((prev) => prev - 1);
  //     }
  //     if (secondsPlayer1 === 0) {
  //       if (minutesPlayer1 === 0) {
  //         clearInterval(intervalPlayer1Ref.current);
  //       } else {
  //         setMinutesPlayer1((prev) => prev - 1);
  //         setSecondsPlayer1(59);
  //       }
  //     }
  //   }, 1000);
  // };

  // useEffect(() => {
  //   if (stop) {
  //     return;
  //   }
  //   if (intervalPlayer1Ref.current) {
  //     clearInterval(intervalPlayer1Ref.current);
  //   } else {
  //     intervalPlayer1Ref.current = setInterval(createInterval, 1000);
  //   }
  //   intervalPlayer2Ref.current = setInterval(() => {
  //     if (secondsPlayer2 > 0) {
  //       setSecondsPlayer2((prev) => prev - 1);
  //     }
  //     if (secondsPlayer2 === 0) {
  //       if (minutesPlayer2 === 0) {
  //         clearInterval(intervalPlayer2Ref.current);
  //       } else {
  //         setMinutesPlayer2((prev) => prev - 1);
  //         setSecondsPlayer2(59);
  //       }
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalPlayer2Ref.current);
  //   };
  // }, [turnPlayer2, minutesPlayer2, secondsPlayer2]);

  console.log(intervalPlayer1Ref.current);
  console.log(turnPlayer1);
  return (
    <div className="flex gap-10 flex-col  items-center  justify-center bg-gray-700  h-screen ">
      <div className="flex  gap-4">
        <div
          style={turnPlayer1 ? { border: "10px  solid green" } : {}}
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
            {turnPlayer1 ? "Turn of " : ""} Player 1
          </p>
        </div>
        <div
          style={turnPlayer2 ? { border: "10px  solid green" } : {}}
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
            {turnPlayer2 ? "Turn of " : ""} Player 2
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
        <button>
          <FontAwesomeIcon size="2xl" icon={faRotateRight} />
        </button>
      </div>
    </div>
  );
};

export default BoardSide;
