"use client";

import { useState } from "react";
import { MdOutlineArrowOutward, MdCheck } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import FormBuilder from "@/components/FormBuilder";

const Page = () => {
  const [formBuilders, setFormBuilders] = useState([]);

  const handleAddQuestion = () => {
    setFormBuilders((prev) => [...prev, { id: Date.now() }]);
  };

  const isDisabled = formBuilders.length === 0;

  return (
    <div className="h-screen sm:w-[640px] mx-auto flex flex-col items-center sm:px-4">
      <header className="w-full bg-white">
        <div className="mx-auto w-full max-w-4xl h-14 border-l border-r border-b flex flex-row justify-between items-center px-6 border-gray-200">
          <input
            className="focus:outline-none gap-2 w-full sm:w-auto h-fit font-semibold text-base leading-[22px]"
            placeholder="Untitled form"
          />
          <button
            disabled={isDisabled}
            className={`w-fit h-fit flex flex-row items-center gap-1 border rounded-2xl border-gray-200 py-1.5 px-3.5 ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <label
              className={`text-center text-xs leading-5 font-semibold ${
                isDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-text-gray-1000 cursor-pointer"
              }`}
            >
              Preview
            </label>
            <MdOutlineArrowOutward />
          </button>
        </div>
      </header>

      <main className="relative w-full max-w-4xl flex flex-col items-center px-4 border-l border-r flex-grow ">
        <div className="flex flex-col items-center gap-6 pt-6 w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            {formBuilders.map((formBuilder) => (
              <div
                key={formBuilder.id}
                className="relative w-full flex justify-center"
              >
                <FormBuilder />
              </div>
            ))}
          </div>

          <div className="py-2 px-4">
            <button
              onClick={handleAddQuestion}
              className="relative z-0 w-fit sm:w-auto h-fit flex flex-row items-center border rounded-2xl py-1.5 pr-4 pl-3.5 gap-1 border-gray-200 max-w-xs sm:max-w-none"
            >
              <HiPlus />
              <label className="font-semibold text-sm leading-5 text-center text-text-gray-1000 cursor-pointer">
                Add Question
              </label>
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl h-14 border-t border-l border-r py-4 px-6 bg-gray-200 bg-[#F6F8FAE5] backdrop-blur-sm flex flex-row justify-between items-center">
        <button
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
            Save a Draft
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
        </button>
      </footer>
    </div>
  );
};

export default Page;
