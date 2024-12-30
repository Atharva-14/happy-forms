"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CustomDropdown from "./ui/CustomDropdown";

const options = [
  {
    text: "Short answer",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 7.5H10.8333"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 12.5H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Long answer",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.5 5H10.8333"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 10H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 15H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Single select",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1792_1208)">
          <path
            d="M10.0001 18.3334C14.6025 18.3334 18.3334 14.6025 18.3334 10.0001C18.3334 5.39771 14.6025 1.66675 10.0001 1.66675C5.39771 1.66675 1.66675 5.39771 1.66675 10.0001C1.66675 14.6025 5.39771 18.3334 10.0001 18.3334Z"
            stroke="#0D0D0D"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M10.0001 13.3334C11.841 13.3334 13.3334 11.841 13.3334 10.0001C13.3334 8.15913 11.841 6.66675 10.0001 6.66675C8.15913 6.66675 6.66675 8.15913 6.66675 10.0001C6.66675 11.841 8.15913 13.3334 10.0001 13.3334Z"
            fill="#0D0D0D"
            stroke="#0D0D0D"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_1792_1208">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  {
    text: "Multiple select",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    text: "URL",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.91675 12.0835L12.0834 7.91675"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M14.0386 12.1746L16.2132 10C17.9289 8.28427 17.9289 5.50252 16.2132 3.78679C14.4975 2.07107 11.7157 2.07107 10 3.78679L7.82537 5.96142M12.1746 14.0386L10 16.2132C8.28427 17.929 5.50253 17.929 3.7868 16.2132C2.07107 14.4975 2.07107 11.7157 3.7868 10L5.96142 7.82538"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Number",
    icon: (
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.97298 2.5L5.63965 17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M17.7229 13.3334H2.7229"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M18.9729 5.83337H3.9729"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M15.6397 2.5L12.3064 17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    text: "Date",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 1.66675V3.33341M5 1.66675V3.33341"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99633 10.8333H10.0038M9.99633 14.1666H10.0038M13.3259 10.8333H13.3334M6.66675 10.8333H6.67422M6.66675 14.1666H6.67422"
          stroke="#0D0D0D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.91675 6.66675H17.0834"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.08325 10.2027C2.08325 6.57162 2.08325 4.75607 3.12669 3.62803C4.17012 2.5 5.84949 2.5 9.20825 2.5H10.7916C14.1503 2.5 15.8298 2.5 16.8732 3.62803C17.9166 4.75607 17.9166 6.57162 17.9166 10.2027V10.6307C17.9166 14.2618 17.9166 16.0773 16.8732 17.2053C15.8298 18.3333 14.1503 18.3333 10.7916 18.3333H9.20825C5.84949 18.3333 4.17012 18.3333 3.12669 17.2053C2.08325 16.0773 2.08325 14.2618 2.08325 10.6307V10.2027Z"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.5 6.66675H17.5"
          stroke="#0D0D0D"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    text: "Time",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="48"
        height="48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="15" y2="15" />
      </svg>
    ),
  },
];

const FormBuilder = forwardRef(({ id, questionData = {} }, ref) => {
  const [selectedOption, setSelectedOption] = useState(() => ({
    ...(options.find((x) => x.text === questionData?.selectedOption) || {
      text: "Short answer",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 7.5H10.8333"
            stroke="#0D0D0D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2.5 12.5H17.5"
            stroke="#0D0D0D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    }),
  }));

  const [radioOptions, setRadioOptions] = useState([
    {
      id: Date.now(),
      text: "Option 1",
    },
    {
      id: Date.now() + 1,
      text: "Option 2",
    },
  ]);

  const [checkOptions, setCheckOptions] = useState([
    {
      id: Date.now(),
      text: "Option 1",
    },
    {
      id: Date.now() + 1,
      text: "Option 2",
    },
  ]);

  // Refs for form fields
  const titleInputRef = useRef();
  const helpTextInputRef = useRef();
  const shortAnsInputRef = useRef();
  const longAnsInputRef = useRef();
  const urlInputRef = useRef();
  const numberInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  const handleSelect = (selected) => {
    setSelectedOption(selected);
  };

  const handleRadioOptionChange = (e, id) => {
    const newOptions = radioOptions.map((option) =>
      option.id === id ? { ...option, text: e.target.value } : option
    );
    setRadioOptions(newOptions);
  };

  const handleAddRadioOption = () => {
    setRadioOptions([
      ...radioOptions,
      {
        id: Date.now(),
        text: "",
      },
    ]);
  };

  const handleDeleteRadioOption = (id) => {
    setRadioOptions(radioOptions.filter((option) => option.id !== id));
  };

  const handleSubmit = () => {
    const formData = {
      id,
      title: titleInputRef.current.value,
      helpText: helpTextInputRef.current.value,
      selectedOption: selectedOption.text,
    };

    if (selectedOption.text === "Single select") {
      formData.radioOptions = radioOptions.map((option) => option);
    }

    return formData;
  };

  useImperativeHandle(ref, () => ({
    getData: handleSubmit,
  }));

  useEffect(() => {
    if (Object.keys(questionData).length > 0) {
      titleInputRef.current.value = questionData.title || "";
      helpTextInputRef.current.value = questionData.helpText || "";

      // Load existing radio options if present
      if (questionData.selectedOption === "Single select") {
        setRadioOptions(questionData.radioOptions || []);
      }
    }
  }, [questionData]);

  FormBuilder.displayName = "FormBuilder";

  return (
    <div className="w-full  p-4 border rounded-3xl flex flex-col gap-2 border-[#E1E4E8] bg-white">
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-row gap-2 ">
          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              id="title"
              name="title"
              ref={titleInputRef}
              placeholder="Write a question"
              className="font-inter text-sm font-semibold leading-5 text-left focus:outline-none text-gray-1000 w-full"
            />
            <input
              type="text"
              id="helpText"
              name="helpText"
              ref={helpTextInputRef}
              placeholder="Write a help text or caption (leave empty if not needed)."
              className="font-inter text-xs font-normal leading-4 text-left focus:outline-none text-gray-1000 w-full"
            />
          </div>

          <div className="flex items-center">
            <CustomDropdown
              options={options}
              onSelect={handleSelect}
              selOpt={selectedOption}
            />
          </div>

          <button className="text-gray-500 cursor-move md:ml-2">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.375 3.23828H4.38029M4.375 8.23828H4.38029M4.375 13.2383H4.38029M11.0364 3.23828H11.0417M11.0364 8.23828H11.0417M11.0364 13.2383H11.0417"
                stroke="rgba(107, 114, 128, var(--tw-text-opacity))"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="w-full flex flex-col gap-2">
          {selectedOption?.text === "Short answer" && (
            <input
              id="shortAnswer"
              name="shortAnswer"
              ref={shortAnsInputRef}
              type="text"
              readOnly
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
            />
          )}

          {selectedOption?.text === "Long answer" && (
            <textarea
              id="longAnswer"
              name="longAnswer"
              ref={longAnsInputRef}
              readOnly
              className="w-full h-20 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
            />
          )}

          {selectedOption?.text === "Single select" && (
            <div className="flex flex-col gap-2">
              {radioOptions.map((option, index) => (
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
                    onChange={(e) => handleRadioOptionChange(e, option.id)}
                    className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
                  />
                  {index < radioOptions.length - 1 && (
                    <button
                      type="button"
                      className="text-text-gray-1000 hover:text-red-500"
                      onClick={() => handleDeleteRadioOption(option.id)}
                    >
                      ✕
                    </button>
                  )}
                  {index === radioOptions.length - 1 && (
                    <button
                      type="button"
                      className="text-text-gray-1000 hover:text-[#00AA45]"
                      onClick={handleAddRadioOption}
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.9729 8.00004H8.63957M13.3062 8.00004H8.63957M8.63957 8.00004V3.33337M8.63957 8.00004V12.6667"
                          stroke="#0D0D0D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {selectedOption?.text === "URL" && (
            <input
              id="url"
              name="url"
              ref={urlInputRef}
              type="url"
              readOnly
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
            />
          )}

          {selectedOption?.text === "Number" && (
            <input
              id="number"
              name="number"
              ref={numberInputRef}
              type="number"
              readOnly
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
            />
          )}

          {selectedOption?.text === "Date" && (
            <input
              id="date"
              name="date"
              ref={dateInputRef}
              type="date"
              readOnly
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
            />
          )}

          {selectedOption?.text === "Time" && (
            <input
              id="time"
              name="time"
              ref={timeInputRef}
              type="time"
              readOnly
              className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
            />
          )}
        </div>
      </div>
    </div>
  );
});

export default FormBuilder;
