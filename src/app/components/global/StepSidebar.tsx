import React, { forwardRef } from "react";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/context/FormContext";
import { cn } from "@/app/lib/utils";

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
    const router = useRouter(); // ✅ initialize the router
    const { data } = useFormContext();
    const isCustomerProjectFilled = data.customerId.trim().length > 0;
    const isDescriptionFilled = data.customerId.trim().length > 0;

    const isStepEnabled = (index: number) => {
      if (index === 0) return true;
      if (index === 1) return isCustomerProjectFilled;
      if (index === 2) return isCustomerProjectFilled && isDescriptionFilled;
      if (index === 3) return isCustomerProjectFilled && isDescriptionFilled;

      return false; // Disable by default unless logic is added
    };

    const handleStepClick = (index: number) => {
      // if (!isStepEnabled(index)) return;

      router.push(`?step=${index + 1}`);
    };
    return (
      <div
        ref={ref}
        className="w-full min-h-fit lg:w-[10%] lg:absolute lg:left-0 lg:top-0 z-50 p-5 lg:py-14 2xl:py-16 space-x-3 lg:space-x-0 2xl:space-y-6 flex flex-row lg:flex-col justify-center items-center"
      >
        {steps.map((step, index) => {
          const isActive = index <= currentStep;
          const isDisabled = !isStepEnabled(index);

          const circleClass = isActive
            ? "bg-[#d773b5] text-white border-[#d773b5]"
            : "text-[#d773b5] border-[#d773b5]";

          const textClass = isActive
            ? "text-[#d773b5] font-semibold"
            : "text-[#d773b5]";

          return (
            <div
              key={index}
              className="flex lg:flex-col items-center"
            >
              <div
                className={cn("flex flex-col items-center", isDisabled ? "cursor-not-allowed" : "cursor-pointer")}
                 onClick={() =>handleStepClick(index)}
              >
                <div
                  className={cn("flex items-center justify-center text-xl w-10 h-10 lg:w-14 lg:h-14 2xl:w-16 2xl:h-16 rounded-full border-2 font-bold", circleClass)}
                >
                  {index + 1}
                </div>
                <div
                  className={cn("text-sm mt-2 text-center font-bold lg:text-md", textClass)}
                >
                  {step.description}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="h-px w-10 mt-1 lg:w-px lg:h-10 2xl:h-16 2xl:mt-5 bg-primary" />
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
