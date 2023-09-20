import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Accordion from "./Accordion";
const ConfigModal = ({ show, onCloseModal }) => {
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

  console.log(configValuesPlayer1, configValuesPlayer2);
  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center backdrop-blur-sm">
      <section className="w-[50%]  sm:w-2/4 md:w-1/2 lg:w-1/3 xl:w-1/4 absolute bg-gray-300 rounded-md p-10  sm:p-8 flex flex-col gap-6">
        <button className="absolute top-0 right-0 p-2" onClick={onCloseModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section>
          <h3 className="font-bold text-2xl text-center">
            <span className="text-black">Game Settings</span>
          </h3>
          <form className="flex flex-col gap-10">
            <div>
              {" "}
              <Accordion
                player={configValuesPlayer1}
                setConfigValues={setConfigValuesPlayer1}
                title={"PLAYER 1"}
              />
            </div>
            <div>
              <Accordion
                player={configValuesPlayer2}
                setConfigValues={setConfigValuesPlayer2}
                title={"PLAYER 2"}
              />
            </div>
          </form>
        </section>
        <button
          className="hover:bg-green-400  bg-black text-white rounded-md p-2"
          onClick={onCloseModal}>
          Apply
        </button>
      </section>
    </div>
  );
};

export default ConfigModal;
