import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepTopNavProps {
  onBack?: () => void;
  onNext?: () => void;
  disableBack?: boolean;
  disableNext?: boolean;
}

const StepTopNav: React.FC<StepTopNavProps> = ({
  onBack,
  onNext,
  disableBack = false,
  disableNext = false,
}) => {
  const buttonBaseClasses = "flex items-center gap-1 text-black font-semibold";

  return (
    <div className="flex justify-center lg:justify-end lg:absolute lg:top-0 w-full bg-gray-200 z-50">
      <div className="w-[90%] flex justify-between py-4 px-20 sticky top-0 z-50 items-end">
        <button
          onClick={onBack}
          disabled={disableBack}
          className={cn(
            buttonBaseClasses,
            disableBack && "opacity-50 cursor-not-allowed"
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={disableNext}
          className={cn(
            buttonBaseClasses,
            disableNext && "opacity-50 cursor-not-allowed"
          )}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default StepTopNav;
