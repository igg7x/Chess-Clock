import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ConfigModal = ({ show, onCloseModal }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center backdrop-blur-sm">
      <section className="w-[500px] absolute bg-gray-300 h-[300px] rounded-md p-[20px] flex flex-col   ">
        <button className="relative top-0 left-56" onClick={onCloseModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section>
          <h3 className="font-bold text-2xl text-center">
            <span className="text-black">Settings</span>
          </h3>
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <label className="text-black font-semibold">Player 1</label>
              <input className="border-2 border-black rounded-md" type="text" />
            </div>
            <div className="flex gap-5">
              <label className="text-black font-semibold">Player 2</label>
              <input className="border-2 border-black rounded-md" type="text" />
            </div>
          </div>
        </section>
        <button
          className="relative top-24 hover:bg-green-400 w-24 bg-black text-white rounded-md p-1 "
          onClick={onCloseModal}>
          Apply
        </button>
      </section>
    </div>
  );
};

export default ConfigModal;
