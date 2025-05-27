"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FolderUp } from "lucide-react";
import { useFormContext } from "../../context/FormContext";
import { Button } from "../ui/button";

interface DescriptionStepProps {
  onNext: () => void;
  setStepValid: (valid: boolean) => void;
}

export default function DescriptionStep({
  onNext,
  setStepValid,
}: DescriptionStepProps) {
  const { data, updateField } = useFormContext();
  const [description, setDescription] = useState(data.description || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setStepValid(!!description.trim());
  }, [description, setStepValid]);

  const handleGenerate = async () => {
    const trimmedDescription = description.trim();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
  
    if (!trimmedDescription) {
      toast.error("Please provide a description before proceeding.");
      return;
    }
  
    try {
      const customerId = data.customerId || "defaultCustomerId";
  
      // Step 1: Send description data
      const response = await fetch(`${baseUrl}/AiEstimation/CreateAiEstimation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId,
          description: trimmedDescription,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message || response.statusText}`);
        return;
      }
      const result = await response.json();
      updateField("estimationId", result.id);
      console.log("Estimation created:", result.id,"result.id",result,"result",result.id.id,"result.id.id");
      // Step 2: Upload file if available
      const file = fileInputRef.current?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
  
        const uploadResponse = await fetch(`${baseUrl}/api/File/UploadEstimationExel`, {
          method: "POST",
          body: formData,
        });
  
        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          toast.error(`File upload failed: ${uploadError.message || uploadResponse.statusText}`);
          return;
        }
  
        updateField("file", file);
      }
  
      // Step 3: Finalize
      updateField("description", trimmedDescription);
      toast.success("Form submitted!");
      onNext();
    } catch (error) {
      toast.error("Failed to submit estimation request.");
      console.error("Submission error:", error);
    }
  };
  
  

  return (
    <div
      className="h-full bg-cover bg-bottom bg-no-repeat bg-gray-200"
      style={{ backgroundImage: "url('/images/first-step-background-image.png')" }}
    >
      <div className="w-full lg:w-3/4 2xl:w-1/2 p-10 py-14 lg:ml-40 2xl:ml-80">
        <div className="bg-white border-4 border-gray-200 rounded-3xl p-6 lg:p-8 2xl:p-14 shadow-xl space-y-6">
          <h2 className="text-2xl xl:text-4xl font-bold">Description of the module</h2>

          <p className="text-lg lg:text-xl text-gray-600 2xl:pr-10">
            Describe the module you would like to have estimated as precisely as possible.
            Also include its behavior on the website and modular end devices.
          </p>

          {/* Description Input */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your description"
              className="w-2/3 text-lg border-2 border-black px-3 py-2 2xl:py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <label htmlFor="imageUpload" className="block text-lg font-medium text-gray-700">
              Image Upload (optional)
            </label>
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center h-32 2xl:h-40 w-full md:w-2/3 border-2 border-dashed border-black rounded-md cursor-pointer hover:bg-gray-50 transition"
            >
              <FolderUp className="w-10 h-10 text-primary" />
              <span className="mt-2 text-sm text-gray-600">Upload your image</span>
            </label>
            <input
              type="file"
              id="imageUpload"
              name="imageUpload"
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button onClick={handleGenerate}>Generate</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
