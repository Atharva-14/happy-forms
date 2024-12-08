"use client";
import FormPreview from "@/components/FormPreview";
import PreviewModal from "@/components/PreviewModal";
import React, { useState } from "react";

const Page = () => {
  return (
    <div className="h-screen sm:w-[640px] mx-auto flex flex-col items-center sm:px-4">
      <header className="w-full bg-white">
        <div className="mx-auto w-full max-w-4xl h-14 border-l border-r border-b flex flex-row justify-between items-center px-6 border-gray-200">
          <label
            className="focus:outline-none gap-2 w-full sm:w-auto h-fit font-semibold text-base leading-[22px]"
            placeholder="Untitled form"
          >
            Untitled
          </label>
          {/* <button
            disabled={!isDraftSaved}
            onClick={handleOpenModal}
            className={`w-fit h-fit flex flex-row items-center gap-1 border rounded-2xl border-gray-200 py-1.5 px-3.5 ${
              !isDraftSaved ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <label
              className={`text-center text-xs leading-5 font-semibold ${
                !isDraftSaved
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-text-gray-1000 cursor-pointer"
              }`}
            >
              Preview
            </label>
            <MdOutlineArrowOutward />
          </button> */}
        </div>
      </header>

      <main className="relative w-full max-w-4xl flex flex-col items-center px-4 border-l border-r flex-grow ">
        <div className="flex flex-col items-center gap-6 pt-6 w-full">
          <div className="flex flex-col items-center gap-4 w-full">
            {/* {formBuilders.map((formBuilder, index) => (
              <div
                key={formBuilder.id}
                className="relative w-full flex justify-center"
              >
                <FormBuilder
                  id={formBuilder.id}
                  ref={
                    formBuilderRefs.current[index] ||
                    (formBuilderRefs.current[index] = React.createRef())
                  }
                  questionData={formBuilder.questionData}
                />
              </div>
            ))} */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
