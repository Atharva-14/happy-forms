"use client";

import React, { useRef, useState, useEffect } from "react";
import FormBuilder from "@/components/FormBuilder";
import PreviewModal from "@/components/PreviewModal";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const [formBuilders, setFormBuilders] = useState([]);
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewDisabled, setIsPreviewDisabled] = useState(true);

  const formBuilderRefs = useRef([]);
  const formTitleRef = useRef();
  const router = useRouter();
  const { toast } = useToast();

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
    const newFormBuilder = { id: newId, questionData: { isRequired: false } };
    setFormBuilders((prev) => [...prev, newFormBuilder]);
    formBuilderRefs.current.push(React.createRef());
  };

  const handleSaveAsDraft = () => {
    if (formBuilders.length > 0) {
      setIsDraftSaved(true);
      setIsPreviewDisabled(false); // Enable the Preview button
      localStorage.setItem("isDraftSaved", "true");
    }

    const updatedAllData = formBuilderRefs.current.map((formBuilderRef) => {
      if (formBuilderRef.current) {
        console.log("formBuilders", formBuilderRef.current.getData());
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
    toast({
      title: "Saved as Draft",
      variant: "success",
    });
  };

  const handlePublish = () => {
    try {
      // Start loading
      setIsLoading(true);

      const title = formTitleRef.current?.value.trim() || "Untitled Form";

      // Check if the title is empty
      if (!title || title === "Untitled Form") {
        toast({
          title: "Form title cannot be empty!",
          variant: "destructive",
        });
        setIsLoading(false); // Stop loading
        return;
      }

      // Check if there are no questions in the form
      if (formBuilders.length === 0) {
        toast({
          title: "Form must have at least one question!",
          variant: "destructive",
        });
        setIsLoading(false); // Stop loading
        return;
      }

      // Prepare form data
      const formData = {
        formTitle: title,
        questions: formBuilders.map((_, index) => {
          const ref = formBuilderRefs.current[index];
          return ref?.current?.getData() || {};
        }),
      };

      // Generate a unique form ID and timestamp
      const formId = Date.now().toString();
      formData.id = formId;
      formData.createdAt = new Date().toISOString();

      // Save the form data temporarily
      localStorage.setItem("publishForm", JSON.stringify(formData));

      // Update published forms list in localStorage
      const publishedForms =
        JSON.parse(localStorage.getItem("publishedForms")) || [];
      const updatedPublishedForms = [...publishedForms, formData];
      localStorage.setItem(
        "publishedForms",
        JSON.stringify(updatedPublishedForms)
      );

      // Clear the draft form data
      localStorage.removeItem("formData");
      setFormBuilders([]);
      setFormTitle("");
      setIsDraftSaved(false);
      formTitleRef.current.value = "";

      // Simulate loading time before navigating
      setTimeout(() => {
        router.push("/submit-form");
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      console.error("Error publishing form:", error);
      toast({
        title: "Failed to publish the form. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false); // Stop loading in case of error
    }
  };

  const handleDeleteQuestion = (id) => {
    setFormBuilders((prev) => prev.filter((builder) => builder.id !== id));
    toast({ title: "Question Deleted", variant: "destructive" });
  };

  // console.log("formBuilders", formBuilders);

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
            required
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.56297 11.6318L11.4376 4.75711M11.4376 4.75711V11.3568M11.4376 4.75711H4.83795"
                stroke="#0D0D0D"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
                handleDelete={handleDeleteQuestion}
              />
            </div>
          ))}
          <div className="flex justify-center items-center">
            <button
              onClick={handleAddQuestion}
              className="flex w-fit items-center border rounded-2xl py-2 px-4 gap-2 border-gray-200"
            >
              <svg
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.83334 8.00004H8.50001M13.1667 8.00004H8.50001M8.50001 8.00004V3.33337M8.50001 8.00004V12.6667"
                  stroke="#24292E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

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
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1668 7.33337V6.66671C13.1668 4.15255 13.1668 2.89547 12.3857 2.11442C11.6047 1.33337 10.3476 1.33337 7.83347 1.33337H7.16687C4.65272 1.33337 3.39564 1.33337 2.6146 2.11441C1.83355 2.89545 1.83354 4.15252 1.83352 6.66666L1.8335 9.33337C1.83347 11.8475 1.83346 13.1046 2.61448 13.8856C3.39553 14.6666 4.65265 14.6667 7.1668 14.6667"
              stroke="#24292E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.8335 4.66663H10.1668M4.8335 7.99996H10.1668"
              stroke="#24292E"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8.83347 13.8846V14.6667H9.61573C9.88867 14.6667 10.0251 14.6667 10.1478 14.6159C10.2705 14.565 10.367 14.4686 10.56 14.2756L13.7757 11.0596C13.9577 10.8776 14.0487 10.7866 14.0974 10.6885C14.19 10.5017 14.19 10.2824 14.0974 10.0956C14.0487 9.99744 13.9577 9.90644 13.7757 9.72444C13.5937 9.54244 13.5027 9.45144 13.4045 9.40277C13.2177 9.31024 12.9983 9.31024 12.8115 9.40277C12.7134 9.45144 12.6223 9.54244 12.4403 9.72444L9.2246 12.9404C9.0316 13.1334 8.93513 13.2298 8.88433 13.3525C8.83347 13.4752 8.83347 13.6116 8.83347 13.8846Z"
              stroke="#0D0D0D"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>

          <span className="font-semibold text-sm text-center text-text-gray-1000">
            Save as Draft
          </span>
        </button>
        <button
          onClick={handlePublish}
          disabled={isDisabled || isLoading}
          type="submit"
          className={`flex items-center border rounded-2xl py-1.5 pr-4 pl-3.5 text-white gap-1 ${
            isDisabled || isLoading
              ? "bg-green-400 opacity-50 cursor-not-allowed"
              : "bg-[#00AA45] border-[#1E874B]"
          }`}
        >
          {isLoading ? (
            <span className="w-4 h-4 border-2 border-t-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></span>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8.38091L6 11.1666L13 4.66663"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
    </div>
  );
};

export default Page;
