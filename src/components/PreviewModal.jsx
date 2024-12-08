import React, { useEffect, useRef } from "react";
import { MdOutlineArrowOutward, MdCheck } from "react-icons/md"; // Ensure you import the necessary icons
import { RiDraftLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import FormBuilder from "./FormBuilder"; // Assuming FormBuilder is a separate component
import { IoClose } from "react-icons/io5";
import FormPreview from "./FormPreview";

const PreviewModal = ({ isOpen, onClose, content, formTitle }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

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
                <FormPreview key={obj.id} data={obj?.questionData} />
              ))}
            </div>
          </div>
        </main>

        <footer className="w-full max-w-4xl h-14 border-t border-l border-r py-4 px-6 bg-gray-200 bg-[#F6F8FAE5] backdrop-blur-sm flex flex-row justify-between items-center">
          {/* <button
            onClick={handleSaveAsDraft}
            disabled={isDisabled}
            className={`w-fit h-fit flex flex-row items-center border rounded-2xl py-1.5 pr-4 pl-3.5 gap-1 border-gray-200 ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <RiDraftLine />
            <label
              className={`text-center text-sm leading-5 font-semibold ${
                isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-text-gray-1000 cursor-pointer"
              }`}
            >
              Save as Draft
            </label>
          </button>
          <button
            disabled={isDisabled}
            className={`w-fit h-fit flex flex-row items-center border rounded-2xl py-1.5 pr-4 pl-3.5 gap-1 ${
              isDisabled
                ? "bg-green-400 border-green-400 opacity-50 cursor-not-allowed"
                : "bg-[#00AA45] border-green-500 cursor-pointer"
            }`}
          >
            <MdCheck className="text-white" />
            <label
              className={`text-center text-sm leading-5 font-semibold text-white ${
                isDisabled ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              Publish Form
            </label>
          </button> */}
        </footer>
      </div>
    </div>
  );
};

export default PreviewModal;
