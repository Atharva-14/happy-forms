"use client";

import React, { useRef } from "react";

const FormPreview = ({ data, isPreview, onAnswerChange }) => {
  const shortAnsInputRef = useRef();
  const longAnsInputRef = useRef();
  const urlInputRef = useRef();
  const numberInputRef = useRef();
  // const radioInputRefs = useRef([]);
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  // Capture user input and notify parent through onAnswerChange
  const handleInputChange = (questionId, answer, isChecked) => {
    if (onAnswerChange) {
      if (data?.selectedOption === "Multiple select") {
        const currentAnswers = data.answer || [];
        const updatedAnswers = isChecked
          ? [...currentAnswers, answer]
          : currentAnswers.filter((ans) => ans !== answer);

        onAnswerChange(questionId, updatedAnswers);
      } else {
        onAnswerChange(questionId, answer); // Notify parent component of the change
      }
    }
  };

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
            {data.isRequired && <span className="text-red-500 ml-1">*</span>}
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
            defaultValue={data?.shortAnswer || ""}
            readOnly={isPreview}
            onChange={
              (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
            }
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Long answer" && (
          <textarea
            id="longAnswer"
            name="longAnswer"
            ref={longAnsInputRef}
            readOnly={isPreview}
            defaultValue={data?.longAnswer || ""}
            onChange={
              (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
            }
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
                  disabled={isPreview}
                  onChange={
                    (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
                  }
                  className="h-4 w-4 focus:outline-none "
                />
                <input
                  type="text"
                  defaultValue={option.text}
                  readOnly
                  className="w-full h-8 px-2 py-1.5 gap-2.5 bg-white focus:outline-none "
                />
              </div>
            ))}
          </div>
        )}

        {data?.selectedOption === "Multiple select" && (
          <div className="flex flex-col gap-2">
            {data.radioOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="multiple-select"
                  value={option.text}
                  disabled={isPreview}
                  onChange={
                    (e) =>
                      handleInputChange(data.id, option.text, e.target.checked) // Send answer to parent
                  }
                  className="h-4 w-4 focus:outline-none "
                />
                <input
                  type="text"
                  defaultValue={option.text}
                  readOnly
                  className="w-full h-8 px-2 py-1.5 gap-2.5 bg-white focus:outline-none "
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
            readOnly={isPreview}
            onChange={
              (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
            }
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Number" && (
          <input
            id="number"
            name="number"
            ref={numberInputRef}
            type="number"
            defaultValue={data?.number || ""}
            readOnly={isPreview}
            onChange={
              (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
            }
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Date" && (
          <input
            id="date"
            name="date"
            ref={dateInputRef}
            type="date"
            defaultValue={data?.date || ""}
            readOnly={isPreview}
            onChange={
              (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
            }
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}

        {data?.selectedOption === "Time" && (
          <input
            id="time"
            name="time"
            ref={timeInputRef}
            type="time"
            defaultValue={data?.time || ""}
            readOnly={isPreview}
            onChange={
              (e) => handleInputChange(data.id, e.target.value) // Send answer to parent
            }
            className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
          />
        )}
      </div>
    </div>
  );
};

export default FormPreview;
