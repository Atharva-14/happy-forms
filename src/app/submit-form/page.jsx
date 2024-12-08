"use client";
import FormPreview from "@/components/FormPreview";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState();

  useEffect(() => {
    const publishData = localStorage.getItem("publishForm");

    if (publishData) {
      const data = JSON.parse(publishData);
      console.log("publish data: ", data);

      setFormData(data);
    }
  }, []);

  return (
    <div className="h-screen sm:w-[640px] mx-auto flex flex-col items-center sm:px-4">
      <header className="w-full bg-white">
        <div className="mx-auto w-full max-w-4xl h-14 border-l border-r border-b flex flex-row justify-between items-center px-6 border-gray-200">
          <label
            id="form-title"
            className=" gap-2 w-full sm:w-auto h-fit font-semibold text-base text-text-gray-1000"
          >
            {formData && formData.formTitle}
          </label>
          <div className="w-[300px] gap-2 ">
            <label className="font-normal text-sm text-text-gray-1000">
              Form Completeness - 80%
            </label>
            <div className="border rounded gap-2 border-[#E1E4E8]">
              <div className="w-[245px] h-1 rounded bg-[#00AA45]"></div>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full h-fit max-w-4xl flex flex-col items-center px-4 border-l border-r border-[#E1E4E8]">
        <div className="w-full flex flex-col items-center gap-10 p-6">
          <div className="w-full flex flex-col items-center gap-8">
            {formData &&
              formData.questions.map((question) => (
                <FormPreview key={question.id} data={question} />
              ))}
          </div>
          <div className="w-full flex flex-row justify-end items-end gap-2">
            <button className="font-semibold text-sm text-center border rounded-2xl py-1.5 px-4 gap-2.5 text-white bg-[#00AA45] border-[#1E874B] shadow-lg">
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
