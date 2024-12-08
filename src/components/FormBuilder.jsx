"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import CustomDropdown from "./ui/CustomDropdown";
import { MdOutlineRadioButtonChecked, MdOutlineNumbers } from "react-icons/md";
import { RiLink, RiDraggable } from "react-icons/ri";
import { HiMenuAlt2, HiMenuAlt4, HiPlus } from "react-icons/hi";

const options = [
  { text: "Short answer", icon: <HiMenuAlt4 /> },
  { text: "Long answer", icon: <HiMenuAlt2 /> },
  { text: "Single select", icon: <MdOutlineRadioButtonChecked /> },
  { text: "URL", icon: <RiLink /> },
  { text: "Number", icon: <MdOutlineNumbers /> },
];

const FormBuilder = forwardRef(({ id, questionData = {} }, ref) => {
  const [selectedOption, setSelectedOption] = useState(() => ({
    ...(options.find((x) => x.text === questionData?.selectedOption) || {
      text: "Short answer",
      icon: <HiMenuAlt4 />,
    }),
  }));

  const [radioOptions, setRadioOptions] = useState([
    { id: Date.now(), text: "" },
  ]);

  // Refs for form fields
  const titleInputRef = useRef();
  const helpTextInputRef = useRef();
  const shortAnsInputRef = useRef();
  const longAnsInputRef = useRef();
  const urlInputRef = useRef();
  const numberInputRef = useRef();

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

    console.log("Form Data: ", formData);
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
  }, []);

  return (
    <div className="w-[576px] p-4 border rounded-3xl flex flex-col gap-y-2 border-[#E1E4E8] bg-white">
      <div className="w-full flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-full flex flex-col gap-1">
            <input
              type="text"
              id="title"
              name="title"
              ref={titleInputRef}
              placeholder="Write a question"
              className="font-inter text-sm font-semibold leading-5 text-left focus:outline-none text-gray-1000"
            />
            <input
              type="text"
              id="helpText"
              name="helpText"
              ref={helpTextInputRef}
              placeholder="Write a help text or caption (leave empty if not needed)."
              className="font-inter text-xs font-normal leading-4 text-left focus:outline-none text-gray-1000"
            />
          </div>

          <div className="flex items-center ">
            <CustomDropdown
              options={options}
              onSelect={handleSelect}
              selOpt={selectedOption}
            />
          </div>

          <button className="text-gray-500 cursor-move">
            <RiDraggable />
          </button>
        </div>

        <div className="w-full">
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

          {/* {selectedOption?.text === "Single select" && (
            <div className="flex flex-col gap-2">
              {radioOptions.map((option) => (
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
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => handleDeleteRadioOption(option.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="text-blue-500"
                onClick={handleAddRadioOption}
              >
                <HiPlus />
              </button>
            </div>
          )} */}

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
                      <HiPlus />
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
        </div>
      </div>
    </div>
  );
});

export default FormBuilder;
