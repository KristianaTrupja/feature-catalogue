"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { Edit, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useFormContext } from "@/app/context/FormContext";
import { EstimationData } from "@/app/types/Estimations";

interface GenerateFeatureProps {
  onNext: () => void;
  setStepValid: (valid: boolean) => void;
}

export default function GenerateFeature({
  onNext,
  setStepValid,
}: GenerateFeatureProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [description, setDescription] = useState(
    `Below you will find an assessment of your requested module regarding the
duration of the implementation as well as a justification below. Note:
This is a decision-making aid based on experience. If you decide to
implement the module, a detailed estimate must be prepared by a
developer.`
  );
  const [isEditing, setIsEditing] = useState(false);
  const [tempDescription, setTempDescription] = useState(description);
  const [estimation, setEstimation] = useState<EstimationData | null>(null);
  const [loading, setLoading] = useState(false);

  const { data, updateField } = useFormContext();

  const toggleFeature = (title: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(title) ? prev.filter((f) => f !== title) : [...prev, title]
    );
  };

  const handleSave = () => {
    setDescription(tempDescription.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempDescription(description);
    setIsEditing(false);
  };

  const handleGenerateEstimation = () => {
    setStepValid(true);
    onNext();
  };

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const fetchEstimation = async () => {
      try {
        setLoading(true);
        if (!data || !data.estimationId) {
          throw new Error("Estimation ID is missing");
        }
        const response = await fetch(
          `${baseUrl}/AiEstimation/AiEstimation/${data.estimationId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setEstimation(fetchedData);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch estimation");
      } finally {
        setLoading(false);
      }
    };

    if (data) {
      fetchEstimation();
    }
  }, [data]);

  return (
    <div className="lg:p-10 pb-20 h-full bg-right bg-contain bg-no-repeat bg-[url('/images/bg-2.webp')] bg-[#fdfdfd]">
      <div className="container lg:w-3/4 space-y-8 bg-white lg:bg-transparent w-full py-10">
        {/* Title with background */}
        <div className="bg-white/70 rounded-xl p-4 shadow-sm w-fit">
          <h1 className="text-3xl font-bold">Description of the feature</h1>
        </div>

        {/* Description with background */}
        <div className="relative max-w-3xl bg-white/70 rounded-xl p-4 shadow-sm w-fit">
          {!isEditing ? (
            <>
              <p className="text-gray-600 text-lg whitespace-pre-line">
                {description}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="absolute bottom-0 right-0 p-1 text-gray-500 hover:text-primary"
                aria-label="Edit description"
              >
                <Edit size={20} />
              </button>
            </>
          ) : (
            <div className="flex items-start space-x-2">
              <textarea
                value={tempDescription}
                onChange={(e) => setTempDescription(e.target.value)}
                rows={5}
                className="w-full border border-gray-300 rounded p-2 text-gray-700 resize-y"
                autoFocus
              />
              <div className="flex flex-col space-y-1">
                <button
                  onClick={handleSave}
                  className="text-green-600 hover:text-green-800"
                  aria-label="Save description"
                >
                  <Check size={24} />
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Cancel editing"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-primary" />
          </div>
        )}

        {/* Suggested Titles with background */}
        {!loading && estimation && (
          <>
            {estimation.suggestedNames?.length > 0 && (
              <div className="bg-white/70 rounded-xl p-4 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Generated Titles</h2>
                <ul className="list-disc list-inside space-y-1">
                  {estimation.suggestedNames.map((title, index) => (
                    <li key={index} className="text-gray-800">
                      {title}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {estimation.realEstimations?.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {estimation.realEstimations.map(({ title, description }) => (
                  <Card
                    key={title}
                    title={title}
                    description={description}
                    selectable
                    checked={selectedFeatures.includes(title)}
                    onCheckChange={() => toggleFeature(title)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        <Button
          onClick={handleGenerateEstimation}
          disabled={loading}
          className={loading ? "opacity-50 cursor-not-allowed" : ""}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" /> Generating...
            </span>
          ) : (
            "Generate estimation"
          )}
        </Button>
      </div>
    </div>
  );
}
