"use client";

import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { FolderUp, Loader2 } from "lucide-react";
import { useFormContext } from "../../context/FormContext";
import { Button } from "../ui/button";

interface DescriptionStepProps {
  onNext: () => void;
  setStepValid: (valid: boolean) => void;
}

export default function DescriptionStep({ onNext, setStepValid }: DescriptionStepProps) {
  const { data, updateField } = useFormContext();
  const [description, setDescription] = useState(data.description || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

  useEffect(() => {
    setStepValid(!!description.trim());
  }, [description, setStepValid]);

  const handleGenerate = async () => {
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      toast.error("Please provide a description before proceeding.");
      return;
    }

    setLoading(true);

    try {
      const customerId = data.customerId || "defaultCustomerId";

      const estimationRes = await fetch(`${baseUrl}/AiEstimation/CreateAiEstimation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, description: trimmedDescription }),
      });

      if (!estimationRes.ok) {
        const err = await estimationRes.json();
        toast.error(`Error: ${err.message || estimationRes.statusText}`);
        return;
      }

      const { id } = await estimationRes.json();
      updateField("estimationId", id);

      const file = fileInputRef.current?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch(`${baseUrl}/api/File/UploadEstimationExel`, {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const uploadErr = await uploadRes.json();
          toast.error(`File upload failed: ${uploadErr.message || uploadRes.statusText}`);
          return;
        }

        updateField("file", file);
      }

      updateField("description", trimmedDescription);
      toast.success("Form submitted!");
      onNext();
    } catch (error) {
      toast.error("Failed to submit estimation request.");
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
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

          <div className="space-y-2">
            <label htmlFor="description" className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Your description"
              className="w-2/3 text-lg border-2 border-black px-3 py-2 2xl:py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          <div className="pt-4">
            <Button onClick={handleGenerate} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
