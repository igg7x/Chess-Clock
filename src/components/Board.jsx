import React, { useState, useEffect, useRef, useReducer } from "react";
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
import ConfigModal from "./ConfigModal";
import { useModal } from "../hooks/useModal";

const timesReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case PLAYERS.player1:
      return {
        ...state,
        player1: {
          minutes:
            state.player1.seconds === 0
              ? state.player1.minutes - 1
              : state.player1.minutes,
          seconds: state.player1.seconds === 0 ? 59 : state.player1.seconds - 1,
        },
        player2: {
          ...state.player2,
        },
      };
    case PLAYERS.player2:
      return {
        ...state,
        player1: {
          ...state.player1,
        },
        player2: {
          minutes:
            state.player2.seconds === 0
              ? state.player2.minutes - 1
              : state.player2.minutes,
          seconds: state.player2.seconds === 0 ? 59 : state.player2.seconds - 1,
        },
      };

    case "RESET":
      return {
        ...state,
        player1: { minutes: 0, seconds: 10 },
        player2: { minutes: 1, seconds: 0 },
      };
    default:
      return state;
  }
};

const BoardSide = () => {
  const [turnPlayer, setTurnPlayer] = useState("");
  const [stop, setStop] = useState(true);
  const intervalPlayer1Ref = useRef(null);
  const intervalPlayer2Ref = useRef(null);
  const [times, dispatch] = useReducer(timesReducer, {
    player1: { minutes: 0, seconds: 10 },
    player2: { minutes: 1, seconds: 0 },
  });

  const { isShowing, toggle: toogleModal } = useModal();

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
    dispatch({ type: "RESET" });
    setTurnPlayer("");
    setStop(true);
    clearsIntervals();
  };

  function clearsIntervals() {
    clearInterval(intervalPlayer1Ref.current);
    clearInterval(intervalPlayer2Ref.current);
  }

  useEffect(() => {
    if (stop) {
      clearsIntervals();
      return;
    }
    if (times.player1.minutes === 0 && times.player1.seconds === 0) {
      clearInterval(intervalPlayer1Ref.current);
      return;
    }
    if (times.player2.minutes === 0 && times.player2.seconds === 0) {
      clearInterval(intervalPlayer2Ref.current);
      return;
    }
    if (turnPlayer === PLAYERS.player1) {
      intervalPlayer1Ref.current = setInterval(
        () => dispatch({ type: PLAYERS.player1 }),
        1000
      );
    } else {
      intervalPlayer2Ref.current = setInterval(
        () => dispatch({ type: PLAYERS.player2 }),
        1000
      );
    }
    return () => {
      clearsIntervals();
    };
  }, [stop, turnPlayer, times]);

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

  // const createInterval = (seconds, minutes, setSeconds, setMinutes) => {
  //   if (seconds > 0) {
  //     setSeconds((prev) => prev - 1);
  //   }
  //   if (seconds === 0) {
  //     if (minutes === 0) {
  //       clearInterval(intervalPlayer1Ref.current);
  //     } else {
  //       setMinutes((prev) => prev - 1);
  //       setSeconds(59);
  //     }
  //   }
  // };

  // //TIMER PLAYER 1
  // useEffect(() => {
  //   if (stop) {
  //     clearsIntervals();
  //     return;
  //   }
  //   if (turnPlayer === PLAYERS.player1) {
  //     intervalPlayer1Ref.current = setInterval(
  //       () =>
  //         createInterval(
  //           secondsPlayer1,
  //           minutesPlayer1,
  //           setSecondsPlayer1,
  //           setMinutesPlayer1
  //         ),
  //       1000
  //     );
  //   } else {
  //     intervalPlayer2Ref.current = setInterval(
  //       () =>
  //         createInterval(
  //           secondsPlayer2,
  //           minutesPlayer2,
  //           setSecondsPlayer2,
  //           setMinutesPlayer2
  //         ),
  //       1000
  //     );
  //   }
  //   return () => {
  //     clearsIntervals();
  //   };
  // }, [
  //   turnPlayer,
  //   minutesPlayer1,
  //   secondsPlayer1,
  //   secondsPlayer2,
  //   minutesPlayer2,
  //   stop,
  // ]);

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
        <span className="text-black underline">CHESS </span>
        <span className="text-white underline"> CLOCK</span>
        <FontAwesomeIcon className="text-black" icon={faChessKing} />
      </h3>
      <div className="flex justify-center max-[400px]:flex-col  max-[400px]:justify-center  w-[90%] h-[70%] gap-4">
        <PlayerClock
          name={PLAYERS.player1}
          turn={turnPlayer}
          turnPlayer={turnPlayer === PLAYERS.player1}
          handleClick={handleClick}
          minutes={times.player1.minutes}
          seconds={times.player1.seconds}
        />
        <PlayerClock
          name={PLAYERS.player2}
          turn={turnPlayer}
          turnPlayer={turnPlayer === PLAYERS.player2}
          handleClick={handleClick}
          minutes={times.player2.minutes}
          seconds={times.player2.seconds}
        />
      </div>
      <div className="flex justify-center  gap-4">
        <Button icon={faGear} onButtonClick={toogleModal} />
        <ConfigModal show={isShowing} onCloseModal={toogleModal} />
        <button onClick={handleStart}>
          {stop ? (
            <FontAwesomeIcon size="3x" icon={faPause} />
          ) : (
            <FontAwesomeIcon size="3x" icon={faPlay} />
          )}
        </button>
        <Button onButtonClick={handleReset} icon={faRotateRight} />
      </div>
    </div>
  );
};

export default BoardSide;
