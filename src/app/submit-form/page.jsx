"use client";
import FormPreview from "@/components/FormPreview";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const [formData, setFormData] = useState(null); // Ensure formData is initially null

  const [windowWidth, setWindowWidth] = useState(0); // Initial value to 0 to avoid SSR issues
  const [windowHeight, setWindowHeight] = useState(0); // Initial value to 0 to avoid SSR issues
  const [answers, setAnswers] = useState({}); // Store user answers
  const [progress, setProgress] = useState(0); // Store the progress of the form
  const [isSubmitting, setIsSubmitting] = useState(false); // Track submission state
  const router = useRouter(); // Initialize router for navigation
  const { toast } = useToast();

  // Update window dimensions on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);

      window.addEventListener("resize", handleResize);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const publishData = localStorage.getItem("publishForm");

    if (publishData) {
      const data = JSON.parse(publishData);
      setFormData(data);
    }
  }, []);

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      updatedFormData.questions = updatedFormData.questions.map((question) =>
        question.id === questionId ? { ...question, answer: answer } : question
      );

      setAnswers((prevAnswers) => {
        const updatedAnswers = {
          ...prevAnswers,
          [questionId]: answer,
        };
        updateProgress(updatedAnswers);
        return updatedAnswers;
      });

      return updatedFormData;
    });
  };

  // Calculate progress
  const updateProgress = (updatedAnswers = answers) => {
    if (formData) {
      const totalQuestions = formData.questions.length;
      const answeredQuestions = Object.values(updatedAnswers).filter(
        (answer) => answer !== ""
      ).length;
      const newProgress = (answeredQuestions / totalQuestions) * 100;
      setProgress(newProgress);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    const submittedForms =
      JSON.parse(localStorage.getItem("submittedForms")) || [];

    const formWithAnswers = { ...formData };

    submittedForms.push(formWithAnswers);

    localStorage.setItem("submittedForms", JSON.stringify(submittedForms));

    //Show toast after submitting the form
    toast({
      title: "Form Submitted",
      description:
        "Your form has been submitted successfully. Redirecting to the home page...",
    });

    setTimeout(() => {
      router.push("/"); // Redirect to the home page
    }, 6000); // Stay on the page for 6 seconds before redirecting
  };

  return (
    <div className="h-screen sm:w-[640px] mx-auto flex flex-col items-center sm:px-4 relative">
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
              Form Completeness - {Math.round(progress)}%
            </label>
            <div className="border rounded gap-2 border-[#E1E4E8]">
              <div
                className={`h-1 rounded bg-[#00AA45] ${
                  progress < 100 ? "animate-pulse" : ""
                }`}
                style={{ width: `${progress}%` }}
              ></div>
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
                  onAnswerChange={handleAnswerChange} // Pass the handler to capture the user's answers
                />
              ))}
          </div>

          <div className="w-full flex flex-row justify-end items-end gap-2">
            <button
              className="font-semibold text-sm text-center border rounded-2xl py-1.5 px-4 gap-2.5 text-white bg-[#00AA45] border-[#1E874B] shadow-lg"
              onClick={handleSubmit}
              disabled={isSubmitting} // Disable the button when submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page;
