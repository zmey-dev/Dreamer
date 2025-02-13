import React from "react";

export const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 z-[50] bg-black/70 flex justify-center items-center"
      onClick={onCancel}
    >
      <div className="p-2 rounded-lg shadow-inner shadow-gray-600">
        <div
          className="w-96 min-h-20 p-2 flex flex-col bg-black rounded-lg border border-gray-500"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <p className="text-white text-lg text-center bg-gray-00 mx-4 py-2 border-b">
            {message}
          </p>
          <div className="flex space-x-4 m-4 h-8">
            <button
              onClick={onConfirm}
              className="grow rounded-md bg-green-500"
            >
              Yes
            </button>
            <button onClick={onCancel} className="grow rounded-md bg-red-500">
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
