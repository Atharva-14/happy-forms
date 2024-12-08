import React, { useEffect, useRef, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import FormPreview from "./FormPreview";

const PreviewModal = ({ isOpen, onClose, content, formTitle }) => {
  const modalRef = useRef(null);

  const handleClickOutside = useCallback(
    (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose, handleClickOutside]); // `handleClickOutside` is now stable due to `useCallback`

  if (!isOpen) return null;

  console.log("inside modal", content);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className="h-screen sm:w-[640px] mx-auto flex flex-col items-center bg-white w-full max-w-4xl rounded-lg shadow-lg relative overflow-auto"
      >
        <header className="w-full bg-white">
          <div className="mx-auto w-full max-w-4xl h-14 border flex flex-row justify-between items-center px-6 border-gray-200">
            <label
              className="focus:outline-none gap-2 w-full sm:w-auto h-fit font-semibold text-base leading-[22px]"
              placeholder="Untitled form"
              readOnly
            >
              {formTitle}
            </label>
            <button
              onClick={onClose}
              className="ww-fit h-fit flex flex-row items-center gap-1 border rounded-2xl border-gray-200 py-1.5 px-3.5"
            >
              <label className="text-center text-xs leading-5 font-semibold text-text-gray-1000 cursor-pointer">
                Close
              </label>
              <IoClose />
            </button>
          </div>
        </header>

        <main className="relative w-full max-w-4xl flex flex-col items-center px-4 border-l border-r border-[#E1E4E8] flex-grow">
          <div className="flex flex-col items-center gap-10 p-6 w-full">
            <div className="flex flex-col items-center gap-8 w-full">
              {content.map((obj, index) => (
                <FormPreview
                  key={obj.id}
                  data={obj?.questionData}
                  isPreview={true}
                />
              ))}
            </div>
          </div>
        </main>

        <footer className="w-full max-w-4xl h-14 border-t border-l border-r py-4 px-6 bg-gray-200 bg-[#F6F8FAE5] backdrop-blur-sm flex flex-row justify-between items-center"></footer>
      </div>
    </div>
  );
};

export default PreviewModal;
