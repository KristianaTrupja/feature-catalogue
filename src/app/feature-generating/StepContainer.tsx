"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ClassificationStep from "../components/steps/ClassificationStep";
import DescriptionStep from "../components/steps/DescriptionStep";
import StepSidebar from "../components/global/StepSidebar";
import StepTopNav from "../components/global/StepTopNav";
import GenerateFeature from "../components/steps/GenerateFeature";
import Estimation from "../components/steps/Estimation";
import DynamicHeightWrapper from "../components/global/DynamicHeightWrapper";

// Steps can be static outside the component to avoid recreation
const steps = [
  { label: "Step 1", description: "Choose the project" },
  { label: "Step 2", description: "Write description" },
  { label: "Step 3", description: "Generate feature" },
  { label: "Step 4", description: "Feature estimation" },
];

export default function StepContainer() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stepParam = searchParams?.get("step");

  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const navRef = useRef<HTMLDivElement>(null); 

  // Sync step from URL
  useEffect(() => {
    const parsedStep = parseInt(stepParam || "", 10);
    if (!isNaN(parsedStep) && parsedStep >= 1 && parsedStep <= steps.length) {
      setCurrentStep(parsedStep - 1);
    }
  }, [stepParam]);

  const goToStep = (index: number) => {
    if (index >= 0 && index < steps.length) {
      setCurrentStep(index);
      router.push(`?step=${index + 1}`);
    }
  };

  const goNext = () => goToStep(currentStep + 1);
  const goBack = () => goToStep(currentStep - 1);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ClassificationStep setStepValid={setIsStepValid} />;
      case 1:
        return <DescriptionStep onNext={goNext} setStepValid={setIsStepValid} />;
      case 2:
        return <GenerateFeature onNext={goNext} setStepValid={setIsStepValid} />;
      case 3:
        return <Estimation />;
      default:
        return null;
    }
  };


  return (
    <DynamicHeightWrapper absoluteRefs={[navRef as React.RefObject<HTMLElement>]}>
      <div className="flex flex-col lg:flex-row relative h-full">
        <StepSidebar
          ref={navRef}
          currentStep={currentStep}
          steps={steps}
          onStepChange={goToStep}
        />
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden justify-between">
          <div className="flex-1">{renderStep()}</div>
          <StepTopNav
            onBack={goBack}
            onNext={goNext}
            disableBack={currentStep === 0}
            disableNext={!isStepValid}
          /> 
        </div>
      </div>
    </DynamicHeightWrapper>
  );
}
