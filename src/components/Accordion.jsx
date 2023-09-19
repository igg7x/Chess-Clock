import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

const Accordion = ({ title, player, setConfigValues }) => {
  const [show, setShow] = useState(false);
  const handleAccordion = () => {
    setShow(!show);
  };
  const { name, minutes, seconds } = player;

  const handleChanges = (e) => {
    const { id, value } = e.target;
    setConfigValues({
      ...player,
      [id]: value,
    });
  };

  return (
    <div>
      <div>
        <div className="flex items-center justify-center gap-10">
          <h1>{title}</h1>
          {show ? (
            <FontAwesomeIcon onClick={handleAccordion} icon={faMinus} />
          ) : (
            <FontAwesomeIcon onClick={handleAccordion} icon={faPlus} />
          )}
        </div>
        {show ? (
          <div>
            <div>
              <label htmlFor="name">Name </label>
              <input
                className="
              w-20
              h-10
              border-2
              border-gray-200
              rounded-lg
              focus:outline-none
              focus:border-green-400
              text-center
              text-xl
              font-semibold"
                type="text"
                id="name"
                value={name}
                onChange={handleChanges}
              />
            </div>
            <div>
              <label htmlFor="time" className="">
                Time
              </label>
              <div>
                <input
                  onChange={handleChanges}
                  autoComplete="off"
                  name={minutes}
                  max="59"
                  min="0"
                  type="number"
                  id="minutes"
                  className="
                  w-20
                  h-10
                  border-2
                  border-gray-200
                  rounded-lg
                  focus:outline-none
                  focus:border-green-400
                  text-center
                  text-xl
                  font-semibold"
                  value={minutes}
                />
                <span
                  className="
                 text-xl
                  font-semibold 
                ">
                  {" "}
                  :{" "}
                </span>
                <input
                  onChange={handleChanges}
                  autoComplete="off"
                  name={seconds}
                  type="number"
                  id="seconds"
                  className="
                  w-20
                  h-10
                  border-2
                  border-gray-200
                  rounded-lg
                  focus:outline-none
                  focus:border-green-400
                  text-center
                  text-xl
                  font-semibold"
                  min="0"
                  max="59"
                  value={seconds}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Accordion;
