import React, { useEffect, useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/button";
import { Edit, Check, X } from "lucide-react";
import { toast } from "sonner";

const featureExamples = [
  {
    title: "SEO Optimized Content",
    description:
      "Automatically include relevant SEO keywords for better ranking.",
  },
  {
    title: "Storytelling Tone",
    description: "Use a narrative style to make the article more engaging.",
  },
  {
    title: "Image Placeholders",
    description: "Add suggested images and captions for visual appeal.",
  },
  {
    title: "Summary Section",
    description: "Provide a concise summary at the end of the article.",
  },
];

const mockTitles = [
  "How AI is Revolutionizing Skincare",
  "The Science Behind Eucerin’s Innovation",
  "Nivea's Next Big Feature",
];

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
  const [estimations, setEstimations] = useState<any[]>([]);

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
    const fetchEstimations = async () => {
      try {
        const response = await fetch(`${baseUrl}/AiEstimation/AiEstimation/{id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEstimations(data);
      } catch (err: any) {
        toast.error(err.message || "Failed to fetch estimations");
      }
    };
  
    fetchEstimations();
  }, []);
  console.log("Estimations:", estimations);
  return (
    <div className="p-10 pb-20 bg-gray-200 h-full">
      <div className="container w-3/4 space-y-8 py-10">
        {/* Headline */}
        <h1 className="text-3xl font-bold">Description of the feature</h1>

        <div className="relative max-w-3xl">
          {!isEditing && (
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
          )}

          {isEditing && (
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

        {/* Generated Titles */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Generated Titles</h2>
          <ul className="list-disc list-inside space-y-1">
            {mockTitles.map((title, index) => (
              <li key={index} className="text-gray-800">
                {title}
              </li>
            ))}
          </ul>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureExamples.map(({ title, description }) => (
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

        {/* Generate Button */}
        <Button onClick={handleGenerateEstimation}>Generate estimation</Button>
      </div>
    </div>
  );
}
