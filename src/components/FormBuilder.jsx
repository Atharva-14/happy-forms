"use client";

import { useState } from "react";
import CustomDropdown from "./ui/CustomDropdown";
import { MdOutlineRadioButtonChecked, MdOutlineNumbers } from "react-icons/md";
import { RiLink, RiDraggable } from "react-icons/ri";
import { HiMenuAlt2, HiMenuAlt4, HiPlus } from "react-icons/hi";

const FormBuilder = () => {
  const [selectedOption, setSelectedOption] = useState({
    text: "Short answer",
    icon: <HiMenuAlt4 />,
  });

  const [radioOptions, setRadioOptions] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);

  const [questionTitle, setQuestionTitle] = useState("");

  const [questionHelpText, setQuestionHelpText] = useState("");

  const options = [
    { text: "Short answer", icon: <HiMenuAlt4 /> },
    { text: "Long answer", icon: <HiMenuAlt2 /> },
    { text: "Single select", icon: <MdOutlineRadioButtonChecked /> },
    { text: "URL", icon: <RiLink /> },
    { text: "Number", icon: <MdOutlineNumbers /> },
  ];

  const handleSelect = (selected) => {
    setSelectedOption(selected);
  };

  const handleRadioOptionChange = (e, id) => {
    const newOptions = radioOptions.map((option) =>
      option.id === id ? { ...option, text: e.target.value } : option
    );
    setRadioOptions(newOptions);
  };

  return (
    <div className="w-[576px] p-4 border rounded-3xl flex flex-col gap-y-2 border-gray-200 bg-white">
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              id="question-title"
              placeholder="Write a question"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
              className={`font-inter text-sm font-semibold leading-5 text-left focus:outline-none ${
                questionTitle ? "text-gray-1000" : "text-gray-400"
              } `}
            />
            <input
              type="text"
              id="question-help-text"
              placeholder="Write a help text or caption (leave empty if not needed)."
              value={questionHelpText}
              onChange={(e) => setQuestionHelpText(e.target.value)}
              className={`font-inter text-xs font-normal leading-4 text-left focus:outline-none ${
                questionHelpText ? "text-gray-1000" : "text-gray-400"
              } `}
            />
          </div>

          <div className="flex items-center ">
            <CustomDropdown options={options} onSelect={handleSelect} />
          </div>

          <button className="text-gray-500 cursor-move">
            <RiDraggable />
          </button>
        </div>

        <div className="w-full">
          {selectedOption?.text === "Short answer" && (
            <input
              type="text"
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-light"
            />
          )}

          {selectedOption?.text === "Long answer" && (
            <textarea className="w-full h-20 px-2 py-1.5 gap-2.5 border rounded-lg bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-light" />
          )}

          {selectedOption?.text === "Single select" && (
            <div className="flex flex-col gap-2">
              {radioOptions.map((option, index) => (
                <div
                  key={option.id}
                  className={`flex items-center gap-2 ${
                    index === radioOptions.length - 1 ? "gap-2" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="single-select"
                    value={option.text}
                    onChange={() => {}}
                    className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-light"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleRadioOptionChange(e, option.id)}
                    className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-light"
                  />

                  {index === radioOptions.length - 1 && (
                    <button
                      type="button"
                      className="w-4 h-4"
                      onClick={() =>
                        setRadioOptions([
                          ...radioOptions,
                          {
                            id: Date.now(),
                            text: `Option ${radioOptions.length + 1}`,
                          },
                        ])
                      }
                    >
                      <HiPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedOption?.text === "URL" && (
            <input
              type="url"
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-light"
            />
          )}

          {selectedOption?.text === "Number" && (
            <input
              type="number"
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-gray-100 border-gray-100 focus:outline-none focus:ring-2 focus:ring-light"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
