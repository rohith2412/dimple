import { useState } from "react";

const InfoNotice = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="">

      <div className="flex justify-center scale-75">
        <button
          onClick={() => setShow(true)}
          className="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 text-sm font-bold flex items-center justify-center shadow transition"
          title="Info"
        >
          ?
        </button>
      </div>


      {show && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={() => setShow(false)}
        >
          <div
            className="bg-white p-5 rounded-lg shadow-lg w-[90%] max-w-md text-center text-gray-700"
            onClick={(e) => e.stopPropagation()} 
          >
            <p className="text-base">
              📢  * This match is based on the same location and age, also the pair will keep on changing every week
            </p>
            <button
              onClick={() => setShow(false)}
              className="mt-4 px-4 py-2 bg-green-400 border-black border rounded hover:bg-gray-800 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoNotice;

