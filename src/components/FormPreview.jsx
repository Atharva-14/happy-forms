"use client";

import React, { useEffect, useRef } from "react";

const FormPreview = ({ data, isPreview, onAnswerChange }) => {
  const titleInputRef = useRef();
  const helpTextInputRef = useRef();
  const shortAnsInputRef = useRef();
  const longAnsInputRef = useRef();
  const urlInputRef = useRef();
  const numberInputRef = useRef();
  const radioInputRefs = useRef([]);

  // Capture user input and notify parent through onAnswerChange
  const handleInputChange = (questionId, answer) => {
    if (onAnswerChange) {
      onAnswerChange(questionId, answer); // Notify parent component of the change
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
                  className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-light"
                />
                <input
                  type="text"
                  defaultValue={option.text}
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
      </div>
    </div>
  );
};

export default FormPreview;

// import React, { useEffect, useRef, useState } from "react";

// const FormPreview = ({ data, isPreview }) => {
//   //   const [selectedOption, setSelectedOption] = useState(da);

//   const titleInputRef = useRef();
//   const helpTextInputRef = useRef();
//   const shortAnsInputRef = useRef();
//   const longAnsInputRef = useRef();
//   const urlInputRef = useRef();
//   const numberInputRef = useRef();
//   const radioInputRefs = useRef([]);

//   //   useEffect(() => {
//   //     setSelectedOption(data.selectedOption);
//   //   }, []);

//   // console.log(data);

//   return (
//     <div className="w-full flex flex-col gap-1">
//       <div className="flex gap-2">
//         <div className="w-full flex flex-col gap-1">
//           <label
//             type="text"
//             id="title"
//             name="title"
//             className="font-inter text-sm font-semibold leading-5 text-left focus:outline-none text-gray-1000"
//           >
//             {data?.title}
//           </label>
//           <label
//             type="text"
//             id="helpText"
//             name="helpText"
//             className="font-inter text-xs font-normal leading-4 text-left focus:outline-none text-gray-1000"
//           >
//             {data?.helpText}
//           </label>
//         </div>
//       </div>

//       <div className="w-full">
//         {data?.selectedOption === "Short answer" && (
//           <input
//             id="shortAnswer"
//             name="shortAnswer"
//             ref={shortAnsInputRef}
//             type="text"
//             defaultValue={data?.shortAnswer || ""}
//             readOnly={isPreview}
//             className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
//           />
//         )}

//         {data?.selectedOption === "Long answer" && (
//           <textarea
//             id="longAnswer"
//             name="longAnswer"
//             ref={longAnsInputRef}
//             readOnly={isPreview}
//             defaultValue={data?.longAnswer || ""}
//             className="w-full h-20 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
//           />
//         )}

//         {data?.selectedOption === "Single select" && (
//           <div className="flex flex-col gap-2">
//             {data.radioOptions.map((option) => (
//               <div key={option.id} className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="single-select"
//                   value={option.text}
//                   disabled={isPreview}
//                   className="h-4 w-4 focus:outline-none focus:ring-2 focus:ring-light"
//                 />
//                 <input
//                   type="text"
//                   defaultValue={option.text}
//                   readOnly
//                   className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {data?.selectedOption === "URL" && (
//           <input
//             id="url"
//             name="url"
//             ref={urlInputRef}
//             type="url"
//             readOnly={isPreview}
//             className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
//           />
//         )}

//         {data?.selectedOption === "Number" && (
//           <input
//             id="number"
//             name="number"
//             ref={numberInputRef}
//             type="number"
//             defaultValue={data?.number || ""}
//             readOnly={isPreview}
//             className="w-full h-8 px-2 py-1.5 gap-2.5 border rounded-lg bg-white border-[#E1E4E8] focus:outline-none "
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default FormPreview;
