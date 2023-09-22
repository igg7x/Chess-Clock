import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const LostModal = ({ show, onCloseModal, turnPlayer, onReset }) => {
  const handleClick = () => {
    onReset();
    onCloseModal();
  };

  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 left-0 w-full h-full  flex items-center justify-center backdrop-blur-sm">
      <section className="w-[50%]  max-[800px]:w-[75%]   max-[300px]:gap-2  h-auto sm:w-[90%] md:w-[80%] absolute lg:w-[70%] xl:w-[60%]  bg-gray-300 rounded-md p-8 flex flex-col  items-center gap-10">
        <button className="absolute top-0 right-0 p-2" onClick={onCloseModal}>
          <FontAwesomeIcon size="2x" icon={faXmark} />
        </button>
        <h1 className="font-bold">
          {turnPlayer} has no more time on his clock !
        </h1>
        <button
          onClick={handleClick}
          type="submit"
          className="hover:bg-green-400 w-28 bg-black text-white rounded-md p-2">
          Reset Match
        </button>
      </section>
    </div>
  );
};

export default LostModal;
