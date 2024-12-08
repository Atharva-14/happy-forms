"use client";
import FormPreview from "@/components/FormPreview";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti"; // Importing the confetti package

const Page = () => {
  const [formData, setFormData] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isConfetti, setIsConfetti] = useState(false); // State to trigger confetti
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Store the window width
  const [windowHeight, setWindowHeight] = useState(window.innerHeight); // Store the window height
  const router = useRouter(); // Initialize router for navigation

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const publishData = localStorage.getItem("publishForm");

    if (publishData) {
      const data = JSON.parse(publishData);
      console.log("publish data: ", data);
      setFormData(data);
    }
  }, []);

  const handleSubmit = () => {
    // Get the existing submittedForms from localStorage or initialize an empty array
    const submittedForms =
      JSON.parse(localStorage.getItem("submittedForms")) || [];

    // Add the current form data to the submittedForms list
    submittedForms.push(formData);

    // Save the updated list back to localStorage
    localStorage.setItem("submittedForms", JSON.stringify(submittedForms));

    // Trigger the confetti explosion and success message
    setIsConfetti(true);
    setShowSuccessPopup(true);

    // Set a timeout to hide the success popup and redirect to home after a few seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
      router.push("/"); // Redirect to the home page
    }, 6000); // Stay on the page for 6 seconds before redirecting
  };

  return (
    <div className="h-screen sm:w-[640px] mx-auto flex flex-col items-center sm:px-4 relative">
      {/* Confetti Animation */}
      {isConfetti && (
        <Confetti
          width={windowWidth} // Use dynamic window width
          height={windowHeight} // Use dynamic window height
          className="absolute top-0 left-0 z-10"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      <header className="w-full bg-white">
        <div className="mx-auto w-full max-w-4xl h-14 border-l border-r border-b flex flex-row justify-between items-center px-6 border-gray-200">
          <label
            id="form-title"
            className="gap-2 w-full sm:w-auto h-fit font-semibold text-base text-text-gray-1000"
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
                <FormPreview
                  key={question.id}
                  data={question}
                  isPreview={false}
                />
              ))}
          </div>

          {/* Success Popup */}
          {showSuccessPopup && (
            <div className="w-full flex flex-col justify-center items-center bg-blue-800 text-white border-4 border-blue-400 rounded-lg text-lg font-bold p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="text-4xl font-extrabold animate__animated animate__zoomIn animate__delay-1s">
                🏆 YOU DID IT! 🏆
              </div>
              <div className="text-xl animate__animated animate__fadeIn animate__delay-2s">
                Your form has been successfully submitted!
              </div>
              <div className="mt-2 text-md animate__animated animate__fadeIn animate__delay-3s">
                Thank you for completing the task. Redirecting soon...
              </div>
            </div>
          )}

          <div className="w-full flex flex-row justify-end items-end gap-2">
            <button
              className="font-semibold text-sm text-center border rounded-2xl py-1.5 px-4 gap-2.5 text-white bg-[#00AA45] border-[#1E874B] shadow-lg"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
