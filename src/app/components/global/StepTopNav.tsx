import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button } from "../ui/button";

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
  const buttonBaseClasses = "flex items-center gap-1 text-black font-semibold hover:text-primary";

  return (
    <div className="container flex justify-center w-full z-50 sticky top-0">
      <div className="w-[70%] flex justify-between py-4 px-20 items-center">
        <button
          onClick={onBack}
          disabled={disableBack}
          className={cn(
            buttonBaseClasses,
            disableBack && "opacity-50 cursor-not-allowed hover:text-black"
          )}
        >
          <ArrowLeft className="w-4 h-4 mr-1 " />
          Back
        </button>
        <Button
          onClick={onNext}
          disabled={disableNext}
          className={cn(
            disableNext && "opacity-50 cursor-not-allowed"
          )}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default StepTopNav;
