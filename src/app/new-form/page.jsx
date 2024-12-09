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
  const [formTitle, setFormTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewDisabled, setIsPreviewDisabled] = useState(true);

  const formBuilderRefs = useRef([]);
  const formTitleRef = useRef();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setFormTitle(formTitleRef.current?.value || "Untitled Form");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const savedFormData = localStorage.getItem("formData");
    const draftSavedFlag = localStorage.getItem("isDraftSaved");

    if (savedFormData) {
      const { formTitle, questions } = JSON.parse(savedFormData);
      formTitleRef.current.value = formTitle;
      setFormTitle(formTitle);

      setFormBuilders(
        questions.map((questionData) => ({
          id: questionData?.id,
          questionData,
        }))
      );
    }

    setIsDraftSaved(draftSavedFlag === "true");
  }, []);

  const handleAddQuestion = () => {
    const newId = Date.now().toString();
    const newFormBuilder = { id: newId, questionData: {} };
    setFormBuilders((prev) => [...prev, newFormBuilder]);
    formBuilderRefs.current.push(React.createRef());
  };

  // const handleSaveAsDraft = () => {
  //   if (formBuilders.length > 0) {
  //     setIsDraftSaved(true);
  //     localStorage.setItem("isDraftSaved", "true");
  //   }

  //   const updatedAllData = formBuilderRefs.current.map((formBuilderRef) => {
  //     if (formBuilderRef.current) {
  //       return formBuilderRef.current.getData();
  //     }
  //     return null;
  //   });

  //   const formData = {
  //     formTitle: formTitleRef.current?.value || "Untitled Form",
  //     questions: updatedAllData.filter((data) => data !== null),
  //   };

  //   setFormBuilders(
  //     formData.questions.map((questionData, index) => ({
  //       id: questionData?.id || Date.now().toString(),
  //       questionData,
  //     }))
  //   );

  //   localStorage.setItem("formData", JSON.stringify(formData));

  //   toast.success("Saved as Draft", {
  //     position: "top-right",
  //     autoClose: 800,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: false,
  //     draggable: false,
  //     progress: undefined,
  //   });
  // };

  const handleSaveAsDraft = () => {
    if (formBuilders.length > 0) {
      setIsDraftSaved(true);
      setIsPreviewDisabled(false); // Enable the Preview button
      localStorage.setItem("isDraftSaved", "true");
    }

    const updatedAllData = formBuilderRefs.current.map((formBuilderRef) => {
      if (formBuilderRef.current) {
        return formBuilderRef.current.getData();
      }
      return null;
    });

    const formData = {
      formTitle: formTitleRef.current?.value || "Untitled Form",
      questions: updatedAllData.filter((data) => data !== null),
    };

    setFormBuilders(
      formData.questions.map((questionData, index) => ({
        id: questionData?.id || Date.now().toString(),
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
      const title = formTitleRef.current?.value.trim() || "Untitled Form";
      if (!title) {
        toast.error("Form title cannot be empty!");
        return;
      }
      if (formBuilders.length === 0) {
        toast.error("Form must have at least one question!");
        return;
      }

      const formData = {
        formTitle: title,
        questions: formBuilders.map((_, index) => {
          const ref = formBuilderRefs.current[index];
          return ref?.current?.getData() || {};
        }),
      };

      const formId = Date.now().toString();
      formData.id = formId;
      formData.createdAt = new Date().toISOString();

      localStorage.setItem("publishForm", JSON.stringify(formData));

      const publishedForms =
        JSON.parse(localStorage.getItem("publishedForms")) || [];
      const updatedPublishedForms = [...publishedForms, formData];
      localStorage.setItem(
        "publishedForms",
        JSON.stringify(updatedPublishedForms)
      );

      localStorage.removeItem("formData");
      setFormBuilders([]);
      setFormTitle("");
      setIsDraftSaved(false);
      formTitleRef.current.value = "";

      router.push("/submit-form");
    } catch (error) {
      console.error("Error publishing form:", error);
      toast.error("Failed to publish the form. Please try again.");
    }
  };

  const isDisabled = formBuilders.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full bg-white">
        <div className="mx-auto md:w-[640px] h-14 border-r border-b border-l flex justify-between items-center px-6 border-gray-200">
          <input
            className="focus:outline-none w-full sm:w-auto h-fit font-semibold text-base"
            placeholder="Untitled form"
            ref={formTitleRef}
            onChange={() => setFormTitle(formTitleRef.current.value)}
          />

          <button
            disabled={isPreviewDisabled}
            onClick={handleOpenModal}
            className={`flex items-center gap-1 border rounded-2xl py-1.5 px-3.5 ${
              isPreviewDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <label
              className={`text-xs font-semibold ${
                isPreviewDisabled
                  ? "text-gray-400"
                  : "text-gray-900 cursor-pointer"
              }`}
            >
              Preview
            </label>
            <MdOutlineArrowOutward
              className={isPreviewDisabled ? "text-gray-400" : "text-gray-900 "}
            />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow md:w-[640px] md:mx-auto border-l border-r px-6 pb-20">
        <div className="w-full flex flex-col gap-6 pt-6">
          {formBuilders.map((formBuilder, index) => (
            <div key={formBuilder.id} className="relative w-full">
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
          <div className="flex justify-center items-center">
            <button
              onClick={handleAddQuestion}
              className="flex w-fit items-center border rounded-2xl py-2 px-4 gap-2 border-gray-200"
            >
              <MdAdd />
              <span className="font-semibold text-sm">Add Question</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full md:w-[640px] mx-auto border-t px-6 py-4 flex justify-between items-center bg-[#F6F8FAE5]">
        <button
          onClick={handleSaveAsDraft}
          disabled={isDisabled}
          className={`flex items-center border rounded-2xl py-1.5 pl-3.5 pr-4 border-[#E1E4E8] gap-1 ${
            isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
          }`}
        >
          <RiDraftLine />
          <span className="font-semibold text-sm text-center text-text-gray-1000">
            Save as Draft
          </span>
        </button>
        <button
          onClick={handlePublish}
          disabled={isDisabled || isLoading}
          className={`flex items-center border rounded-2xl py-1.5 pr-4 pl-3.5 text-white gap-1 ${
            isDisabled || isLoading
              ? "bg-green-400 opacity-50 cursor-not-allowed"
              : "bg-[#00AA45] border-[#1E874B]"
          }`}
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></span>
          ) : (
            <MdCheck />
          )}
          <span className="font-semibold text-sm">
            {isLoading ? "Publishing..." : "Publish Form"}
          </span>
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
