import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faClock } from "@fortawesome/free-solid-svg-icons";
import Accordion from "./Accordion";
import MemoizedFontAwesomeIcon from "./MemoizedFontAwesomeIcon";

const ConfigModal = ({
  show,
  onCloseModal,
  onReset,
  updateSettings,
  isIncrement,
  toggleIncrement,
  increment,
  setIncrement,
}) => {
  const [configValuesPlayer1, setConfigValuesPlayer1] = useState({
    name: "",
    minutes: 0,
    seconds: 0,
  });
  const [configValuesPlayer2, setConfigValuesPlayer2] = useState({
    name: "",
    minutes: 0,
    seconds: 0,
  });

  const [errors, setErrors] = useState({});

  const validate = (configPlayer1, configPlayer2, increment) => {
    const errors = {};

    if (configPlayer1.name === configPlayer2.name) {
      errors.name = "Names must be different";
    }

    if (increment < 1) {
      errors.increment = "Increment must be greater than 0";
      setIncrement(3);
    }

    if (increment > 59) {
      errors.increment = "Increment must be less than 60";
      setIncrement(3);
    }

    if (configPlayer1.seconds > 59) {
      errors.P1seconds = "Seconds must be less than 60";
      setConfigValuesPlayer1({
        ...configPlayer1,
        seconds: 0,
      });
    }
    if (configPlayer2.seconds > 59) {
      errors.P2seconds = "Seconds must be less than 60";
      setConfigValuesPlayer2({
        ...configPlayer2,
        seconds: 0,
      });
    }
    if (configPlayer1.minutes > 999) {
      errors.P1minutes = "Minutes must be less than 4 digits";
      setConfigValuesPlayer1({
        ...configPlayer1,
        minutes: 0,
      });
    }
    if (configPlayer2.minutes > 999) {
      errors.P2minutes = "Minutes must be less than 4 digits";
      setConfigValuesPlayer2({
        ...configPlayer2,
        minutes: 0,
      });
    }

    if (configPlayer1.minutes === "") {
      errors.P1minutes = "Minutes must be greater than 0";
      setConfigValuesPlayer1({
        ...configPlayer1,
        minutes: 0,
      });
    }

    if (configPlayer2.minutes === "") {
      errors.P2minutes = "Minutes must be greater than 0";
      setConfigValuesPlayer2({
        ...configPlayer2,
        minutes: 0,
      });
    }

    if (configPlayer1.seconds === "") {
      errors.P1seconds = "Seconds must be greater than 0";
      setConfigValuesPlayer1({
        ...configPlayer1,
        seconds: 0,
      });
    }

    if (configPlayer2.seconds === "") {
      errors.P2seconds = "Seconds must be greater than 0";
      setConfigValuesPlayer2({
        ...configPlayer2,
        seconds: 0,
      });
    }

    if (configPlayer1.minutes < 0) {
      errors.P1minutes = "Minutes must be greater than 0";
      setConfigValuesPlayer1({
        ...configPlayer1,
        minutes: 0,
      });
    }

    if (configPlayer1.seconds <= 0) {
      errors.P1seconds = "Seconds must be greater than 0";
      setConfigValuesPlayer1({
        ...configPlayer1,
        seconds: 0,
      });
    }

    if (configPlayer2.minutes < 0) {
      errors.P2minutes = "Minutes must be greater than 0";
      setConfigValuesPlayer2({
        ...configPlayer2,
        minutes: 0,
      });
    }

    if (configPlayer2.seconds <= 0) {
      errors.P2seconds = "Seconds must be greater than 0";
      setConfigValuesPlayer2({
        ...configPlayer2,
        seconds: 0,
      });
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(
      configValuesPlayer1,
      configValuesPlayer2,
      increment
    );
    if (Object.keys(errors).length > 0) {
      return setErrors(errors);
    }
    setErrors({});
    onCloseModal();
    updateSettings({
      player1: {
        name: configValuesPlayer1.name || "Player 1",
        minutes: configValuesPlayer1.minutes,
        seconds: configValuesPlayer1.seconds,
      },
      player2: {
        name: configValuesPlayer2.name || "Player 2",
        minutes: configValuesPlayer2.minutes,
        seconds: configValuesPlayer2.seconds,
      },
    });
    onReset();
  };

  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center backdrop-blur-sm">
      <section className="w-[50%]  max-[800px]:w-[75%]   max-[300px]:gap-2  h-auto sm:w-[90%] md:w-[80%] absolute lg:w-[70%] xl:w-[60%]  bg-gray-300 rounded-md p-8 flex flex-col  items-center gap-10">
        <button className="absolute top-0 right-0 p-2" onClick={onCloseModal}>
          <MemoizedFontAwesomeIcon size="2x" icon={faXmark} />
        </button>
        <h1 className="font-bold text-3xl text-center">
          <span className="text-black">Game Settings</span>
        </h1>
        <section>
          <form
            onSubmit={handleSubmit}
            className="flex  max-[650px]:flex-col  max-[650px]:gap-5 w-full 
              items-center justify-center gap-10">
            <div>
              {" "}
              <Accordion
                player={configValuesPlayer1}
                setConfigValues={setConfigValuesPlayer1}
                title={"PLAYER 1"}
              />
              {errors.P1minutes ||
                (errors.P1seconds && (
                  <p className="text-red-500 font-bold">
                    {errors.P1minutes || errors.P1seconds}
                  </p>
                ))}
            </div>
            <div>
              <Accordion
                player={configValuesPlayer2}
                setConfigValues={setConfigValuesPlayer2}
                title={"PLAYER 2"}
              />
              {errors.P2minutes ||
                (errors.P2seconds && (
                  <p className="text-red-500  font-bold">
                    {errors.P2minutes || errors.P2seconds}
                  </p>
                ))}
            </div>
          </form>
          <div
            className="flex flex-col items-
            gap-2 ">
            {errors.name && (
              <p className="text-red-500 font-bold">{errors.name}</p>
            )}
            <div className="flex gap-1 items-center">
              <label htmlFor="increment" className=" font-bold italic">
                <MemoizedFontAwesomeIcon
                  className="text-black"
                  icon={faClock}
                />
                CLOCK Increment :
              </label>
              <input
                className="w-5 rounded-md  h-5"
                type="checkbox"
                id="increment"
                checked={isIncrement}
                onClick={toggleIncrement}
              />
            </div>
            <div>
              {isIncrement ? (
                <label htmlFor="increment" className=" font-bold italic">
                  TIME ADDED AFTER EACH MOVE :
                  <input
                    className="text-center w-12 h-7 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-400 text-xl font-semibold"
                    type="number"
                    required
                    max={"59"}
                    min={"1"}
                    value={increment}
                    onChange={(e) => setIncrement(e.target.value)}
                  />
                  <span className="font-bold italic">(s)</span>
                  {errors.increment && (
                    <p className="text-red-500 font-bold">
                      {errors.increment && errors.increment}
                    </p>
                  )}
                </label>
              ) : (
                <label htmlFor="increment" className=" font-bold italic">
                  NO TIME ADDED AFTER EACH MOVE
                </label>
              )}
            </div>
          </div>
        </section>
        <button
          onClick={handleSubmit}
          type="submit"
          className="hover:bg-green-400 w-28 bg-black text-white rounded-md p-2">
          Apply
        </button>
      </section>
    </div>
  );
};

export default ConfigModal;
