import React, { useState, useEffect, useRef, useReducer } from "react";
import { PLAYERS } from "../constants/Players";
import { ACCIONS } from "../constants/Actions";
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
import { useSettings } from "../hooks/useSettings";
import LostModal from "./LostModal";

const timesReducer = (state, action) => {
  const { type, payload } = action;
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

    case ACCIONS.RESET:
      return {
        ...state,
        ...payload,
      };

    case ACCIONS.INCREMENT_PLAYER1:
      let seconds =
        parseInt(state.player1.seconds) + parseInt(payload.increment);
      let minutes = parseInt(state.player1.minutes);
      if (seconds >= 60) {
        minutes += 1;
        seconds =
          parseInt(state.player1.seconds) + parseInt(payload.increment) - 60;
      }
      console.log(seconds);
      return {
        ...state,
        player1: {
          ...state.player1,
          minutes,
          seconds,
        },
        player2: {
          ...state.player2,
        },
      };

    case ACCIONS.INCREMENT_PLAYER2:
      let seconds2 =
        parseInt(state.player2.seconds) + parseInt(payload.increment);
      let minutes2 = parseInt(state.player2.minutes);
      if (seconds2 >= 60) {
        minutes2 += 1;
        seconds2 =
          parseInt(state.player2.seconds) + parseInt(payload.increment) - 60;
      }
      return {
        ...state,
        player1: {
          ...state.player1,
        },
        player2: {
          ...state.player2,
          minutes: minutes2,
          seconds: seconds2,
        },
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
  // Custom Hooks
  const { isShowing, toggle: toogleModal } = useModal();
  const { isShowing: lostModal, toggle: toogleLostModal } = useModal();
  const { settings, updateSettings } = useSettings();
  const { player1, player2 } = settings;
  const [increment, setIncrement] = useState(3);
  const [isIncrement, setIsIncrement] = useState(false);

  const [times, dispatch] = useReducer(timesReducer, {
    player1: { minutes: player1.minutes, seconds: player1.seconds },
    player2: { minutes: player2.minutes, seconds: player2.seconds },
  });

  const handleStart = () => {
    setStop(!stop);
    if (!turnPlayer) {
      setTurnPlayer(player1.name);
    }
  };
  const handleClick = () => {
    if (!stop) {
      setTurnPlayer((prev) =>
        prev === player1.name ? player2.name : player1.name
      );
      if (isIncrement) {
        if (turnPlayer === player1.name) {
          dispatch({
            type: `INCREMENT-${Object.keys(settings)[0]}`,
            payload: { increment },
          });
        } else {
          dispatch({
            type: `INCREMENT-${Object.keys(settings)[1]}`,
            payload: { increment },
          });
        }
      }
    }
  };

  const toggleIncrement = () => {
    setIsIncrement(!isIncrement);
  };

  const handleReset = () => {
    dispatch({
      type: "RESET",
      payload: {
        player1: { minutes: player1.minutes, seconds: player1.seconds },
        player2: { minutes: player2.minutes, seconds: player2.seconds },
      },
    });
    setTurnPlayer("");
    setStop(true);
    clearsIntervals();
  };

  function clearsIntervals() {
    clearInterval(intervalPlayer1Ref.current);
    clearInterval(intervalPlayer2Ref.current);
  }

  useEffect(() => {
    if (stop || isShowing) {
      clearsIntervals();
      return;
    }

    if (times.player1.minutes === 0 && times.player1.seconds === 0) {
      toogleLostModal();
      clearInterval(intervalPlayer1Ref.current);
      return;
    }
    if (times.player2.minutes === 0 && times.player2.seconds === 0) {
      toogleLostModal();
      clearInterval(intervalPlayer2Ref.current);
      return;
    }
    if (turnPlayer === player1.name) {
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
  }, [stop, turnPlayer, times, isShowing]);

  useEffect(() => {
    dispatch({
      type: "RESET",
      payload: {
        player1: { minutes: player1.minutes, seconds: player1.seconds },
        player2: { minutes: player2.minutes, seconds: player2.seconds },
      },
    });
  }, [settings]);

  return (
    <div className="flex gap-10 flex-col  items-center  justify-center bg-gray-700  h-screen ">
      <h3 className="font-bold  text-3xl">
        <FontAwesomeIcon className=" text-white" icon={faChessQueen} />
        <span className="text-black underline">CHESS </span>
        <span className="text-white underline"> CLOCK</span>
        <FontAwesomeIcon className="text-black" icon={faChessKing} />
      </h3>
      <div className="flex justify-center max-[500px]:flex-col  max-[500px]:justify-center  w-[90%] h-[70%] gap-4">
        <PlayerClock
          name={player1.name}
          player={Object.keys(settings)[0]}
          turnPlayer={turnPlayer}
          handleClick={handleClick}
          minutes={times.player1.minutes}
          seconds={times.player1.seconds}
        />
        <PlayerClock
          player={Object.keys(settings)[1]}
          name={player2.name}
          turnPlayer={turnPlayer}
          handleClick={handleClick}
          minutes={times.player2.minutes}
          seconds={times.player2.seconds}
        />
      </div>
      <div className="flex justify-center  gap-4">
        <Button icon={faGear} onButtonClick={toogleModal} />
        <ConfigModal
          show={isShowing}
          onReset={handleReset}
          onCloseModal={toogleModal}
          updateSettings={updateSettings}
          isIncrement={isIncrement}
          toggleIncrement={toggleIncrement}
          increment={increment}
          setIncrement={setIncrement}
        />
        <LostModal
          show={lostModal}
          onCloseModal={toogleLostModal}
          turnPlayer={turnPlayer}
          onReset={handleReset}
        />
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
