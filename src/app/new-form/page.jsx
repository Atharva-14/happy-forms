"use client";

import React, { useRef, useState, useEffect } from "react";
import { MdOutlineArrowOutward, MdCheck, MdAdd } from "react-icons/md";
import { RiDraftLine } from "react-icons/ri";
import FormBuilder from "@/components/FormBuilder";
import PreviewModal from "@/components/PreviewModal";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [formBuilders, setFormBuilders] = useState([]);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [formTitle, setFormTitle] = useState(""); // Store the form title
  const [isLoading, setIsLoading] = useState(false);

  const formBuilderRefs = useRef([]);
  const formTitleRef = useRef();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setFormTitle(formTitleRef.current?.value || "Untitled Form"); // Set the form title when opening the modal
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  // Load saved form data and draft status
  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const draftSavedFlag = localStorage.getItem("isDraftSaved");

    if (savedFormData) {
      const { formTitle, questions } = JSON.parse(savedFormData);
      formTitleRef.current.value = formTitle;
      setFormTitle(formTitle); // Set the form title from saved data

      setFormBuilders(
        questions.map((questionData) => ({
          id: questionData?.id,
          questionData,
        }))
      );
    }

    setIsDraftSaved(draftSavedFlag === "true");
  }, []);

  // Add a new question to the form
  const handleAddQuestion = () => {
    const newId = Date.now().toString();
    const newFormBuilder = { id: newId, questionData: {} }; // Add empty question data
    setFormBuilders((prev) => [...prev, newFormBuilder]);
    formBuilderRefs.current.push(React.createRef());
  };

  // Save form as a draft
  const handleSaveAsDraft = () => {
    if (formBuilders.length > 0) {
      setIsDraftSaved(true);
      localStorage.setItem("isDraftSaved", "true");
    }

    const updatedAllData = formBuilderRefs.current.map((formBuilderRef) => {
      if (formBuilderRef.current) {
        return formBuilderRef.current.getData(); // Ensure `getData` is defined in your `FormBuilder`
      }
      return null;
    });

    const formData = {
      formTitle: formTitleRef.current?.value || "Untitled Form",
      questions: updatedAllData.filter((data) => data !== null), // Filter out any null data
    };

    // Directly update the formBuilders state with the updated data
    setFormBuilders(
      formData.questions.map((questionData, index) => ({
        id: questionData?.id || Date.now().toString(), // Ensure each question has a unique id
        questionData,
      }))
    );

    localStorage.setItem("formData", JSON.stringify(formData));

    toast.success("Saved as Draft", {
      position: "top-right",
      autoClose: 800,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  const handlePublish = () => {
    try {
      // Validate the form data
      const title = formTitleRef.current?.value.trim() || "Untitled Form";
      if (!title) {
        toast.error("Form title cannot be empty!");
        return;
      }
      if (formBuilders.length === 0) {
        toast.error("Form must have at least one question!");
        return;
      }

      // Construct the form data
      const formData = {
        formTitle: title,
        questions: formBuilders.map((_, index) => {
          const ref = formBuilderRefs.current[index];
          return ref?.current?.getData() || {}; // Ensure each question has its data
        }),
      };

      // Generate a unique ID and include it in the formData
      const formId = Date.now().toString();
      formData.id = formId;
      formData.createdAt = new Date().toISOString();

      // Save the current form data
      localStorage.setItem("publishForm", JSON.stringify(formData));

      // Update the list of published forms with the full formData
      const publishedForms =
        JSON.parse(localStorage.getItem("publishedForms")) || [];
      const updatedPublishedForms = [...publishedForms, formData];
      localStorage.setItem(
        "publishedForms",
        JSON.stringify(updatedPublishedForms)
      );

      // Clear draft and reset state
      localStorage.removeItem("formData");
      setFormBuilders([]);
      setFormTitle("");
      setIsDraftSaved(false);
      formTitleRef.current.value = "";

      // Redirect to submit form page
      router.push("/submit-form");
    } catch (error) {
      console.error("Error publishing form:", error);
      toast.error("Failed to publish the form. Please try again.");
    }
  };

  const isDisabled = formBuilders.length === 0;

  return (
    <div className="h-screen sm:w-[640px] mx-auto flex flex-col items-center sm:px-4">
      <header className="w-full bg-white">
        <div className="mx-auto w-full max-w-4xl h-14 border-l border-r border-b flex flex-row justify-between items-center px-6 border-gray-200">
          <input
            className="focus:outline-none gap-2 w-full sm:w-auto h-fit font-semibold text-base leading-[22px]"
            placeholder="Untitled form"
            ref={formTitleRef}
            onChange={() => setFormTitle(formTitleRef.current.value)} // Update form title state on input change
          />
          <button
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
          </button>
        </div>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center border-l border-r flex-grow ">
        <div className="flex h-max flex-col items-center gap-6 pt-6 w-full">
          <div className="gap-6">
            <div className="pt-6 gap-8">
              <div className="flex flex-col items-center gap-4 w-full">
                {formBuilders.map((formBuilder, index) => (
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
                ))}
              </div>

              <div className="w-full flex flex-row justify-center items-center py-2 px-4">
                <button
                  onClick={handleAddQuestion}
                  className="relative z-0 w-fit sm:w-auto h-fit flex flex-row items-center border rounded-2xl py-1.5 pr-4 pl-3.5 gap-1 border-gray-200 max-w-xs sm:max-w-none"
                >
                  <MdAdd />
                  <label className="font-semibold text-sm leading-5 text-center text-text-gray-1000 cursor-pointer">
                    Add Question
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl h-14 border-t border-l border-r py-4 px-6 bg-gray-200 bg-[#F6F8FAE5] backdrop-blur-sm flex flex-row justify-between items-center">
        <button
          onClick={handleSaveAsDraft}
          disabled={isDisabled}
          className={`w-fit h-fit flex flex-row items-center border rounded-2xl py-1.5 pr-4 pl-3.5 gap-1 bg-white border-[#E1E4E8] ${
            isDisabled ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <RiDraftLine
            className={`${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-text-gray-1000 cursor-pointer"
            }`}
          />
          <label
            className={`text-center text-sm leading-5 font-semibold ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-text-gray-1000 cursor-pointer"
            }`}
          >
            Save as Draft
          </label>
        </button>
        <button
          disabled={isDisabled || isLoading}
          onClick={handlePublish}
          className={`w-fit h-fit flex flex-row items-center border rounded-2xl py-1.5 pr-4 pl-3.5 gap-1 ${
            isDisabled || isLoading
              ? "bg-green-400 border-green-400 opacity-50 cursor-not-allowed"
              : "bg-[#00AA45] border-green-500 cursor-pointer"
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-4 border-t-4 border-gray-200 border-t-[#00AA45] rounded-full animate-spin mr-3"></div>
          ) : (
            <MdCheck className="text-white" />
          )}
          <label
            className={`text-center text-sm leading-5 font-semibold text-white ${
              isDisabled || isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isLoading ? "Publishing..." : "Publish Form"}
          </label>
        </button>
      </footer>
      <PreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        content={formBuilders}
        formTitle={formTitle}
      />
      <ToastContainer />
    </div>
  );
};

export default Page;
