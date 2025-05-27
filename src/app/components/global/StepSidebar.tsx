import React, { forwardRef } from "react";

type Step = {
  label: string;
  description: string;
};

type StepSidebarProps = {
  steps: Step[];
  currentStep: number;
  onStepChange?: (index: number) => void;
};

const StepSidebar = forwardRef<HTMLDivElement, StepSidebarProps>(
  ({ steps, currentStep}, ref) => {
    return (
      <div
        ref={ref}
        className="w-full min-h-fit lg:w-[10%] lg:absolute lg:left-0 lg:top-0 z-50 p-5 lg:py-14 2xl:py-16 space-x-3 lg:space-x-0 2xl:space-y-6 flex flex-row lg:flex-col justify-center items-center"
      >
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const circleClass = isActive
            ? "bg-primary text-white border-primary"
            : "text-[#d773b5] border-[#d773b5]";

          const textClass = isActive
            ? "text-primary font-semibold"
            : "text-[#d773b5]";

          return (
            <div
              key={index}
              className="flex lg:flex-col items-center"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex items-center justify-center text-xl w-10 h-10 2xl:w-16 2xl:h-16 rounded-full border-2 font-bold ${circleClass}`}
                >
                  {index + 1}
                </div>
                <div
                  className={`text-sm mt-2 text-center font-bold lg:text-md ${textClass}`}
                >
                  {step.description}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="h-px w-10 mt-1 lg:w-px lg:h-5 2xl:h-16 2xl:mt-5 bg-primary" />
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

StepSidebar.displayName = "StepSidebar";
export default StepSidebar;
