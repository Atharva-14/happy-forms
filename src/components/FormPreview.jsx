import React, { useEffect, useRef, useState } from "react";

const FormPreview = ({ data }) => {
  //   const [selectedOption, setSelectedOption] = useState(da);

  const titleInputRef = useRef();
  const helpTextInputRef = useRef();
  const shortAnsInputRef = useRef();
  const longAnsInputRef = useRef();
  const urlInputRef = useRef();
  const numberInputRef = useRef();
  const radioInputRefs = useRef([]);

  //   useEffect(() => {
  //     setSelectedOption(data.selectedOption);
  //   }, []);

  console.log(data);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="flex gap-2">
        <div className="w-full flex flex-col gap-1">
          <label
            type="text"
            id="title"
            name="title"
            className="font-inter text-sm font-semibold leading-5 text-left focus:outline-none text-gray-1000"
          >
            {data?.title}
          </label>
          <label
            type="text"
            id="helpText"
            name="helpText"
            className="font-inter text-xs font-normal leading-4 text-left focus:outline-none text-gray-1000"
          >
            {data?.helpText}
          </label>
        </div>
      </div>

      <div className="w-full">
        {data?.selectedOption === "Short answer" && (
          <input
            id="shortAnswer"
            name="shortAnswer"
            ref={shortAnsInputRef}
            type="text"
            readOnly
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Long answer" && (
          <textarea
            id="longAnswer"
            name="longAnswer"
            ref={longAnsInputRef}
            readOnly
            className="w-full h-20 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Single select" && (
          <div className="flex flex-col gap-2">
            {data.radioOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="single-select"
                  value={option.text}
                  disabled
                  className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-light"
                />
                <input
                  type="text"
                  value={option.text}
                  readOnly
                  className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
                />
              </div>
            ))}
          </div>
        )}

        {data?.selectedOption === "URL" && (
          <input
            id="url"
            name="url"
            ref={urlInputRef}
            type="url"
            readOnly
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Number" && (
          <input
            id="number"
            name="number"
            ref={numberInputRef}
            type="number"
            readOnly
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}
      </div>
    </div>
  );
};

export default FormPreview;
